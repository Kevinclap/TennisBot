var playersObject = require('./webS.js').playersObject


const MessengerBot = require('vott-messenger')

/** instantiate MessengerBot */
const myBot = new MessengerBot({
  access_token:'EAABv6trc5SABAF8SckcGCHZCGJYQZCytQ491qeUXKWwngFX2Gy0LRNMDGPQVZBVt5ZCYCZC42mXc1ZATo2NaupMcQPFNZA9cGwrecKSP1eu7Kq4M6fpxSjZADbn5VUOZC2wagPbyX6SO8ZByusmVUZBc5GsPUC7pmdZBmWPO8dLFreW3bgZDZD',
  verify_token:'123bass',
  endpoint: '/facebook/receive',
})

myBot.on('message_received', function (bot, event) {
  bot.chat(event, function (chat) {
    chat.say('Hello!')
    chat.say('Welcome to TennisBot!')
    chat.say('Type "help" at any time if you need some guidance')


    chat.ask('Which city are you from?', function (res, chat) {
      if (res.text === 'help') {
        chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
        chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0')
        chat.repeat()
      } else {
        chat.save({ user_city: res.text })
        var city = res.text
      }
      chat.next()
    })
     chat.ask('Do you want to play with a male, female or both?', function (res, chat) {
      if (res.text === 'help') {
        chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
        chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0')
        chat.repeat()
      } else {
        chat.save({ user_gender: res.text })
        var gender = res.text
      }
      chat.next()
    })

    chat.ask('What player rating are you looking to play with?', function (res, chat) {
      if (res.text === 'help') {
        chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
        chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0');
        chat.repeat()
      } else {  
        chat.save({ user_rating: res.text })
        var rating = res.text
        playersObject(); 
        chat.say('Player: ' + name + 'City: ' + city + 'Rating: ' + rating)
        chat.say(result)
      }
      chat.next()
    
    })

    chat.next()

  })
})








// insert web scrapping function here!



// playersObject() 


myBot.setupServer(3000, function (err, server) {
  if (err) throw Error(err)
  console.log(`Server listening on port ${process.env.PORT}`)
}).setupWebhooks()



  // console.log(chat.state.user_city)
  //     console.log(chat.state.user_gender)
  //     console.log(chat.state.user_rating)




//    function helpEmAll() {
//   chat.say('You can type a gender if you want to play with one in particular, if not, type "both"')
//   chat.say('Player Rating is determined by the National Tennis Rating Program on a scale from 2.0 to 7.0')
// }











