module.exports = {
  start: function(controller, bot) {

    // ping/pong
    controller.hears(['ping'], 'direct_message,direct_mention,mention', function(bot, message) {
      bot.reply(message, "pong");
    });
  }
}
