var http = require('http');
var moment = require('moment');

const api = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=140010';

module.exports = {
  start: function(controller, bot) {
    var self = this;

    // today
    controller.hears(['weather today'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
      self.today(function(result) {
        bot.reply(message, result);
      });
    });

    // tommorow
    controller.hears(['weather tommorow'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
      self.tommorow(function(result) {
        bot.reply(message, result);
      });
    });

    // ask
    controller.hears(['weather'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
      bot.startConversation(message, function(err, convo) {
        convo.ask('`today`, `tommorow`, or `cancel`?', [{
          pattern: 'today',
          callback: function(response, convo) {
            self.today(function(result) {
              convo.say(result);
            });
            convo.next();
          }
        }, {
          pattern: 'tommorow',
          callback: function(response, convo) {
            self.tommorow(function(result) {
              convo.say(result);
            });
            convo.next();
          }
        }, {
          pattern: 'cancel',
          callback: function(response, convo) {
            convo.say('OK canceled.')
            convo.next();
          }
        }, {
          default: true,
          callback: function(response, convo) {
            // just repeat the question
            convo.repeat();
            convo.next();
          }
        }]);
      });
    });
  },

  today: function(callback) {
    var today = moment().format('YYYY-MM-DD');
    get(function(err, json) {
      if (err) {
        callback(err.message);
        return;
      }
      callback(createMessage(json, today));
    });
  },

  tommorow: function(callback) {
    var tommorow = moment(moment()).add(1, 'day').format('YYYY-MM-DD');
    get(function(err, json) {
      if (err) {
        callback(err.message);
        return;
      }
      callback(createMessage(json, tommorow));
    });
  }
};

// api
function get(callback) {
  http.get(api, function(res) {
    var body = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var json = JSON.parse(body);
      callback(null, json);
    });

  }).on('error', function(e) {
    callback(e, null);
  });
}

function createMessage(json, target) {
  for (var i in json.forecasts) {
    var forecast = json.forecasts[i];
    if (forecast.date == target) {

      var result = '';
      result += forecast.image.url + '\n';
      result += '*' + target + '*\n';
      result += '*' + forecast.telop + ' '
      result += (forecast.temperature.min ? forecast.temperature.min.celsius : '--') + '/';
      result += (forecast.temperature.max ? (forecast.temperature.max.celsius) : '--') + '℃*\n';
      result += '\n';
      result += json.description.text + '\n';

      return result;
    }
  }
  return 'weather forecast not found :(';
}
