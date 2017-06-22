// Web Scrapping

var request = require('request')
const cheerio = require('cheerio')

function playersObject (callback) {
  var url = 'http://tennislink.usta.com/leagues/reports/NTRP/SearchResults.aspx?Search=TreeNode&update=1&NationalNodeID=4920768&CYear=2017&SectionNodeID=4920770&DistrictNodeID=4920788&SubDistrictNodeID=4920885&DivisionNodeID=&FlightNodeID=&GenderCode=&NTRPRating='
  request(url, function (error, response, body) {
    console.log('error:', error) // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
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
    console.log(typeof tbl)
  })
}

module.exports = {
  playersObject: playersObject
}

// propiedades
//

// not method
// $("ul#list li:not(.active)")   // not selector

// for (var i = Things.length - 1; i >= 0; i--) {
// 	Things[i]
// }

// tableHeaderRow

// <tr class="tableHeaderRow">
// 		<td>Name</td><td>Gender</td><td>City</td><td>State</td><td>Year End Rating Level</td><td>Year End Rating Date</td><td>Rating Type</td>
// 	</tr>

// tr en loop if uneven change attribute to class = uneven
