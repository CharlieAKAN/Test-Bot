const { Client, IntentsBitField } = require('discord.js');
const { eventHandlers } = require('./event.js');
const openai = require('openai');

require('dotenv').config();

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log('The bot is online!');
});

client.login(TOKEN);

openai.api_key = process.env.OPENAI_API_KEY;

eventHandlers(client, openai);
