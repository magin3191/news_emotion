var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var knex = require('./knex')
const upsert = require('knex-upsert')
var cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

let date = new Date().toISOString().substr(0, 10)
var oneWeekAgo = new Date()
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
let weekAgo = oneWeekAgo.toISOString().substr(0, 10)

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})

app.post('/sources',function(req,res,next){
  newsapi.v2.everything({
    sources: `${searchVal}`,
    language: 'en',
    country: 'us'
  }).then(response => {
    console.log(response);
  });
})

app.post('/search',function(req,res,next){
  console.log(req.body.queryId);
  //use req.body.queryId to retrieve source id and name from api
  //then send {name:'New York Times', id: 'new-york-times'}
  newsapi.v2.everything({
    sources: `${req.body.queryId}`,
    language: 'en',
    // country: 'us'
  }).then(response =>{
  response=response.articles[0].source
  response['selected']=false
  
    console.log(response);
    res.send(response)
  })

})




app.post('/users', function(req, res, next) {
  knex('users')
    .where({ username: req.body.username })
    .then(function(user) {
      if (user.length !== 0) {
        res.status(404).send({ err: 'username is taken' })
        return
      }

      var salt = bcrypt.genSaltSync(4)
      var hash = bcrypt.hashSync(req.body.password, salt)
      knex('users')
        .insert(
          {
            username: req.body.username,
            password: hash
          },
          '*'
        )

        .then(user => {
          var token = jwt.sign({ id: user[0].id }, 'A4e2n84E0OpF3wW21')
          res.status(200).send({ id: user[0].id, token: token })
        })
        .catch(err => {
          res.status(404).send(err)
        })
    })
})

app.post('/login', function(req, res, next) {
  knex
    .select('*')
    .from('users')
    .where({
      username: req.body.username
    })
    .then(function(user) {
      let theUser = user
      if (!user) {
        res.status(401).send('User doesnt exist')
      }
      if (bcrypt.compareSync(req.body.password, user[0].password)) {
        knex
          .select('*')
          .from('users_sources')
          .where({
            users_id: user[0].id
          })
          .join('source', 'users_sources.source_id', 'source.id')
          .then(function(user) {
            if (!user.length) {

              //redirect & return
              res.status(200).send(user)
              return
            } else {
              var token = jwt.sign({ id: user[0].id }, 'A4e2n84E0OpF3wW21')
              let names = user.map(el => {
                return el.name
                  .split(' ')
                  .join('-')
                  .toLowerCase()
              })
              //do watson api call
              let sourceArr = []
              function getNews() {
                newsapi.v2
                  .everything({
                    sources: `${names}`,
                    from: `${weekAgo}`,
                    to: `${date}`,
                    language: 'en',
                    sortBy: 'publishedAt',
                    page: 1,
                    pageSize: 20
                  })
                  .then(response => {
                    response.articles.forEach(source => {
                      sourceArr.push(source)
                    })
                    getEmotions(sourceArr)
                  })
              }

              async function getEmotions(sourceArr) {
                var parameters = {
                  features: {
                    entities: {
                      emotion: true,
                      sentiment: true,
                      limit: 2
                    },
                    keywords: {
                      emotion: true,
                      sentiment: true,
                      limit: 2
                    }
                  }
                }

                for (let i = 0; i < sourceArr.length; i++) {
                  parameters['url'] = `${sourceArr[i].url}`
                  natural_language_understanding.analyze(parameters, function(
                    err,
                    response
                  ) {
                    if (err) console.log('error:', err)
                    else {
                      if (response.entities[0]) {
                        sourceArr[i]['emotion'] = response.entities[0].emotion
                      }
                    }
                  })
                }
                setTimeout(function() {
                  res.status(200).json({ sourceArr: sourceArr, token: token })
                }, 2000)
              }

              getNews()
            }
          })

        // res.status(200).send({ message: 'logged in', token: token })
      } else {
        res.status(404).send("password doesn't match")
      }
    })
})

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
  username: 'd914b0ae-4ea5-4cdc-ab1b-3506775882ff',
  password: 'SN3vUVvfCVUz',
  version_date: `${date}`
})
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('40d18741d48340a8b71eeea34d6ee852')

app.post('/watson', function(req, res, next) {
  //knex route for user sources

  let sourceArr = []
  let body = req.body.id

  function insertSources(username) {
    knex('users')
      .where({ username: username })
      .select('id')
      .then(function(id) {
        let data = body.map(el => {
          let obj = {
            source_id: el,
            users_id: id[0].id
          }
          return obj
        })


        return data
        knex('users_sources')
        .insert(data)
      }).then(function(data){
        console.log(data,'data');
      })

  }

  insertSources(req.body.username)

  if (body.length === 0) {
    res.send(sourceArr)
    return
  }
  function getNews() {
    newsapi.v2
      .everything({
        sources: `${body}`,
        from: `${weekAgo}`,
        to: `${date}`,
        language: 'en',
        sortBy: 'publishedAt',
        page: 1,
        pageSize: 20
      })
      .then(response => {
        response.articles.forEach(source => {
          sourceArr.push(source)
        })
        getEmotions(sourceArr)
      })
  }

  async function getEmotions(sourceArr) {
    var parameters = {
      features: {
        entities: {
          emotion: true,
          sentiment: true,
          limit: 2
        },
        keywords: {
          emotion: true,
          sentiment: true,
          limit: 2
        }
      }
    }

    for (let i = 0; i < sourceArr.length; i++) {
      parameters['url'] = `${sourceArr[i].url}`
      natural_language_understanding.analyze(parameters, function(
        err,
        response
      ) {
        if (err) console.log('error:', err)
        else {
          if (response.entities[0]) {
            sourceArr[i]['emotion'] = response.entities[0].emotion
          }
        }
      })
    }
    setTimeout(function() {
      res.json(sourceArr)
    }, 2000)

    // res.status(200).json(sourceArr)
  }

  getNews()
})
