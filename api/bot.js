const { buffer } = require('micro');
const TelegramBot = require('node-telegram-bot-api');
const Joi = require('joi');
const db = require('./utils/db');
const winston = require('winston');

// Validate ENV
const envSchema = Joi.object({
  BOT_TOKEN: Joi.string().required(),
  APP_URL: Joi.string().uri().required(),
  PAYMENT_MODE: Joi.string().valid('manual','auto').default('manual')
}).unknown().required();
const { error, value: env } = envSchema.validate(process.env);
if (error) {
  console.error('Env validation error:', error.message);
  process.exit(1);
}
const { BOT_TOKEN: token, APP_URL: appUrl, PAYMENT_MODE: paymentMode } = env;

// Logger
const logger = winston.createLogger({ level: 'info', format: winston.format.simple(), transports: [new winston.transports.Console()] });

// Initialize bot and webhook
const bot = new TelegramBot(token);
bot.setWebHook(`${appUrl}/api/bot`);

// Vercel function
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    const buf = await buffer(req);
    const update = JSON.parse(buf.toString());
    bot.processUpdate(update);
    res.status(200).send('OK');
  } catch (err) {
    logger.error('Webhook error:', err);
    res.status(500).send('Error');
  }
};
