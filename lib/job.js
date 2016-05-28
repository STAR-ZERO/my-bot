var util = require('./bot_util.js');
var weather = require('./weather.js')
var CronJob = require('cron').CronJob;

module.exports.start = function(controller, bot) {
  // notify weather forecast to 7:00
  new CronJob('0 0 7 * * *', function() {
    weather.today(function(result) {
      util.say('info', result);
    });
  }, null, true, 'Asia/Tokyo');
};
