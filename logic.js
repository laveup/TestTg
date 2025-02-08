const TelegramBot = require('node-telegram-bot-api');
const token = '7105530900:AAGeMhnJeJ_9E1dtioI7wN1RnVvBD8lNcl4';
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Открой Mini App:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Открыть Mini App', web_app: { url: 'https://laveup.github.io/TestTg/' } }]
        ]
      }
    });
  }
});

// Обработка данных из Mini App
bot.on('web_app_data', (msg) => {
  const data = JSON.parse(msg.web_app_data.data);
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Mini App отправила: ${JSON.stringify(data)}`);
});