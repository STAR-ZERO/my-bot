var schedule = require('node-schedule');
var util = require('./bot_util.js');
var weather = require('./weather.js')

module.exports.start = function(controller, bot) {
  // notify weather forecast to 8:00
  var j = schedule.scheduleJob('0 8 * * *', function() {
    weather.today(function(result) {
      util.say('info', result);
    });
  });
};
