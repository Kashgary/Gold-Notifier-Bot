var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var axios = require("axios").default;

var get_gold = {
    method: 'GET',
    url: 'https://gold-price-live.p.rapidapi.com/get_metal_prices',
    headers: {
      'x-rapidapi-host': 'gold-price-live.p.rapidapi.com',
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
    axios.request(get_gold).then(function (response) {
        prices = JSON.stringify(response.data);
        prices = JSON.parse(prices); 
        sarGold_price_1g = (prices['gold'] * 3.75) / 31;
        sarGold_price_10g = sarGold_price_1g * 10;
        sarGold_price_1g = parseFloat(sarGold_price_1g).toFixed(2);
        sarGold_price_10g = parseFloat(sarGold_price_10g).toFixed(2);
        atme = '@Kashgary#1322 \n'
        message = '```'+''+sarGold_price_1g+''+' 1g - '+(sarGold_price_10g)+' 10g ```'
        bot.sendMessage({
            to: '892475930839224401',
            message: atme+message
        });

    }).catch(function (error) {
        console.log(error)
    });

});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
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
        sarGold_price_1g = (prices['gold'] * 3.75) / 31;
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