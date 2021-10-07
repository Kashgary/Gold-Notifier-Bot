var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var axios = require("axios").default;

var get_gold = {
    method: 'GET',
    url: 'https://live-metal-prices.p.rapidapi.com/v1/latest/XAU/SAR/GRAM',
    headers: {
      'x-rapidapi-host': 'live-metal-prices.p.rapidapi.com',
      'x-rapidapi-key': 'd96c2a489bmshe96b9565a74b1b8p1be0adjsn7b7fa2212542'
    }
  };
  
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    console.log('start')

});
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        if(cmd == 'g'){
            askGoldPrice(channelID)
        }
     }
});


 function askGoldPrice(channelID) { 

    axios.request(get_gold).then(function (response) {
        prices = JSON.stringify(response.data);
        prices = JSON.parse(prices); 
        sarGold_price_1g = prices['rates']['XAU'];
        sarGold_price_10g = sarGold_price_1g * 10;
        sarGold_price_1g = parseFloat(sarGold_price_1g).toFixed(2);
        sarGold_price_10g = parseFloat(sarGold_price_10g).toFixed(2);
        message = '```'+''+sarGold_price_1g+''+' 1g - '+(sarGold_price_10g)+' 10g ```'
        bot.sendMessage({
            to: channelID,
            message: message
        });

    }).catch(function (error) {
        console.log(error)
    });

 }