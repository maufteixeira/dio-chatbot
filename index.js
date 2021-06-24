const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');
const token = '1834239298:AAHKU8_rPR8Iq497scowQJHkoSs3YFmoCdI';

const bot = new TelegramBot(token, { polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

  let textResponse = dfResponse.text;

  if(dfResponse.intent === 'Treino específico') {
    textResponse = await youtube.searchVideoURL(textResponse, dfResponse.fields.corpo.stringValue);
  }

  bot.sendMessage(chatId, textResponse);
});