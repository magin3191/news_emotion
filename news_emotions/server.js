var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var knex = require('./knex')
var cors = require('cors')
app.use(cors())
let date = new Date().toISOString().substr(0, 10)
var oneWeekAgo = new Date()
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
let weekAgo = oneWeekAgo.toISOString().substr(0, 10)

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  username: '8e19273b-ce61-4b8c-af45-4e3b9a744a0e',
  password: 'QH5BVssgEgwT',
  version_date: `${date}` //getdate()
})
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('40d18741d48340a8b71eeea34d6ee852')





app.listen(port,function(){
  console.log(`listening on port ${port}`);
})

app.get('/watson',function(req,res,next){
let sourceArr = []
  async function getNews() {
    newsapi.v2
      .everything({
        sources: 'the-new-york-times',
        from: `${weekAgo}`,
        to: `${date}`,
        language: 'en',
        sortBy: 'publishedAt',
        page: 1,
        pageSize: 10
      })
      .then(async response => {
        response.articles.forEach(source => {
          sourceArr.push(source)
        })
        await getEmotions(sourceArr)
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
        else sourceArr[i]['emotion'] = response.entities[0].emotion
      })
    }
    setTimeout(function() {

      // this.setState({data:sourceArr})
      console.log('sourceARr',sourceArr)
      res.send(sourceArr)


    }, 2000)
  }

  getNews()

  //handleSignIn
  //ajax GET

  //handleSignUp
  //ajax POST

})
