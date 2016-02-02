var Botkit = require('botkit');
var misc = require('./misc.js')
var weather = require('./weather.js')
var tumblr = require('./tumblr.js')

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

  // misc bot
  misc.start(controller, bot);

  // weather forecast
  weather.start(controller, bot);

  // tumblr
  tumblr.start(controller, bot);
};
