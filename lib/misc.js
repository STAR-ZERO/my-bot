var exec = require('child_process').exec;

module.exports = {
  start: function(controller, bot) {

    // ping/pong
    controller.hears(['ping'], 'direct_message,direct_mention,mention', function(bot, message) {
      bot.reply(message, "pong");
    });

    // update bot
    controller.hears(['update bot'], 'direct_message,direct_mention,mention', function(bot, message) {
      exec('git pull', function(error, stdout, stderr) {
        if (error) {
          bot.reply(message, ":warning: Error update!");
        } else {
          if (/Already up\-to\-date/.test(stdout)) {
            bot.reply(message, 'No update available.');
          } else {
            bot.reply(message, ':white_check_mark: Updated! Restart!');
            setTimeout(function() {
              exec('npm restart', function(error, stdout, stderr) {});
            }, 300);
          }
        }
      });
    });
  }
}
