var request = require('request');
var rp = require('request-promise');

exports.spellcheck = function (req, res) {
  var options = {
    url:  `https://api.cognitive.microsoft.com/bing/v5.0/spellcheck/?text=${req.params.text}&mode=spell&mkt=de-de`,
    headers:  {
      'Ocp-Apim-Subscription-Key': '[key]'
    }
  };
  
  rp(options).then((response) => {
    var result = []
    JSON.parse(response).flaggedTokens.map((el) => {
      el.suggestions.map((su) => {
        const suggestion = su.suggestion.charAt(0).toUpperCase() + su.suggestion.slice(1)
        result.push(suggestion)
      })
    })
    res.json(result)
  })
  .catch((error) => {
    res.send(error)
  })
}