var playersObject = require('./webS.js')
var playerList

require('dotenv').config()

const MessengerBot = require('vott-messenger')

/** instantiate MessengerBot */
const myBot = new MessengerBot({
  access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN,
  endpoint: '/facebook/receive',
})

myBot.on('message_received', function (bot, event) {
  bot.chat(event, function (chat) {
    chat.say('Hello!')
    chat.say('I\'m TennisBot!')
    chat.say('Type "help" at any time if you need some guidance')
    chat.ask('Which city are you from?', function (res, chat) {
      if (res.text === 'help') {
        chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
        chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0. You can get more info here: http://s3.amazonaws.com/ustaassets/assets/723/15/adult_ntrp_skill_descriptions.pdf')
        chat.repeat()
      } else {
        chat.save({ user_city: capitalizeFirstLetter(res.text) })
      }
      chat.next()
    })
    chat.ask('Do you want to play with a male or female (M or F)?', function (res, chat) {
      if (res.text === 'help') {
        chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
        chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0. You can get more info here: http://s3.amazonaws.com/ustaassets/assets/723/15/adult_ntrp_skill_descriptions.pdf')
        chat.repeat()
      } else {
        chat.save({ user_gender: res.text.toUpperCase() })
      }
      chat.next()
    })

    chat.ask('What player rating are you looking to play with?', function (res, chat) {
      
      if (res.text === 'help') {
        var hereLink = 'here'
        chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
        chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0');
        chat.say('You can get more info ' + hereLink.link("http://s3.amazonaws.com/ustaassets/assets/723/15/adult_ntrp_skill_descriptions.pdf"));
        chat.repeat()
      } else {
        console.log('Searching players')
        chat.save({ user_rating: res.text })
        var randomResults = playersObject.findPlayers({
          list: playerList,
          gender: chat.state.user_gender,
          rating: chat.state.user_rating,
          city: chat.state.user_city
        })
        

        if (typeof randomResults[0] !== "undefined") {

          for (var i = 0; i < randomResults.length; i++) {
            var fullName = randomResults[i].name.split(' '),
            firstName = fullName[1],
            lastName = fullName[0];
            
            chat.say(firstName + " " + lastName.replace(',', '') + '\n' + randomResults[i].city + '\n' + randomResults[i].rating);
         
          }

        } else {
          chat.say("I could not find any players! Yo can try again at any time!")
        }

      }
      chat.next()

    })

    chat.next()

  })
})




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



playersObject.getPlayerList(function (err, list) {
  playerList = list
  myBot.setupServer(3000, function (err, server) {
    if (err) throw Error(err)
    console.log(`Server listening on port ${process.env.PORT}`)
  }).setupWebhooks()
})



// console.log(chat.state.user_city)
//     console.log(chat.state.user_gender)
//     console.log(chat.state.user_rating)


