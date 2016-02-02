var tumblr = require('tumblr.js');

var client = tumblr.createClient({
  consumer_key: process.env.tumblr_consumer_key,
  consumer_secret: process.env.tumblr_consumer_secret,
  token: process.env.tumblr_token,
  token_secret: process.env.tumblr_token_secret
});

module.exports = {
  start: function(controller, bot) {
    controller.hears(['tumblr'], 'direct_message,direct_mention,mention', function(bot, message) {
      client.dashboard({
        limit: 5,
        type: 'photo'
      }, function(err, data) {
        if (err) {
          bot.reply(message, ':x: Error!');
          return;
        }

        data.posts.forEach(function(post) {
          bot.reply(message, post.short_url);
        });
      });
    });
  }
}
