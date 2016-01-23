var Botkit = require('botkit');

module.exports = {
  say: function(channelName, text) {
    var controller = Botkit.slackbot({
      debug: false
    });

    var bot = controller.spawn({
      token: process.env.bot_token
    });

    bot.api.channels.list({}, function(err, json) {
      if (err) {
        bot.botkit.log('Failed get channels from Slack', err);
      }
      // search channel
      for (var index in json.channels) {
        var channel = json.channels[index];
        if (channelName == channel.name) {
          // post
          bot.api.chat.postMessage({
            text: text,
            channel: channel.id,
            as_user: true
          });
          return;
        }
      }
      bot.botkit.log('channel name not found!');
    });
  },
}
