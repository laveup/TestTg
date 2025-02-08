const TelegramBot = require('node-telegram-bot-api');

// Замените на ваш токен бота
const token = '7105530900:AAGeMhnJeJ_9E1dtioI7wN1RnVvBD8lNcl4';
const bot = new TelegramBot(token, { polling: true });

// Обработка данных от Mini App
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('Hello from')) {
    bot.sendMessage(chatId, `Mini App says: ${text}`);
  } else {
    bot.sendMessage(chatId, 'Unknown command.');
  }
});