var schedule = require('node-schedule');
var util = require('./bot_util.js');
var weather = require('./weather.js')

module.exports.start = function(controller, bot) {
  // notify weather forecast to 7:00
  schedule.scheduleJob('0 7 * * *', function() {
    weather.today(function(result) {
      util.say('info', result);
    });
  });
  // notify trash collection schedule to 0:00
  schedule.scheduleJob('0 0 * * 1,2,4,5', function() {
    util.say('info', "ゴミの日");
  });
};
