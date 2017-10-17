// Web Scrapping

var request = require('request')
const cheerio = require('cheerio')

function getPlayerList (callback) {
  var url = 'http://tennislink.usta.com/leagues/reports/NTRP/SearchResults.aspx?Search=TreeNode&update=1&NationalNodeID=4920768&CYear=2017&SectionNodeID=4920770&DistrictNodeID=4920788&SubDistrictNodeID=4920885&DivisionNodeID=&FlightNodeID=&GenderCode=&NTRPRating='
  request(url, function (error, response, body) {
    if (error || response.statusCode !== 200) return callback(error)
    const $ = cheerio.load(body)
    var tbl = $('table.ResultsTable tr:has(td)').map(function (i, v) {
      var $td = $('td', this)
      return {
        id: ++i,
        name: $td.eq(0).text(),
        gender: $td.eq(1).text(),
        city: $td.eq(2).text(),
        rating: $td.eq(4).text()
      }
    }).get()
    // todo salio bien
    callback(null, tbl)
  })
}

function findPlayers (params) {
  var results = []
  var randomResults = []
  for (var i = 0; i < params.list.length; i++) {
    if (params.list[i].gender === params.gender &&
        params.list[i].city === params.city &&
        params.list[i].rating === params.rating) {
      results.push(params.list[i])
    }
  }
  for (var i = 0; i < 5; i++) {
  let randomIndex = Math.floor(Math.random()*results.length)
  randomResults.push(results[randomIndex]);
  }
  
  return randomResults;

}

  


module.exports = {
  getPlayerList: getPlayerList,
  findPlayers: findPlayers
}



// var results = results[Math.floor(Math.random()*results.length)];

