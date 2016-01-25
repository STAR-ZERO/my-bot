var schedule = require('node-schedule');
var util = require('./bot_util.js');
var weather = require('./weather.js')

module.exports.start = function(controller, bot) {
  // notify weather forecast to 7:00
  var j = schedule.scheduleJob('0 7 * * *', function() {
    weather.today(function(result) {
      util.say('info', result);
    });
  });
};
