var Botkit = require('botkit');
var weather = require('./weather.js')

module.exports.start = function() {

  var controller = Botkit.slackbot({
    debug: false
  });

  var bot = controller.spawn({
    token: process.env.bot_token
  });

  bot.startRTM(function(err, bot, payload) {
    if (err) {
      throw new Error('Could not connect to Slack');
    }
  });

  // weather forecast
  weather.start(controller, bot);
};
