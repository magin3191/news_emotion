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
  }, 3000)

  // res.status(200).json(sourceArr)
}

module.exports = {
  getNews
}
