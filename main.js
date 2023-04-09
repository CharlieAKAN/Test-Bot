require('dotenv/config');
const { Client } = require('discord.js');
const CONFIG = require('./config.js');
const EVENTS = require('./events.js');

const client = new Client({
  intents: CONFIG.intents,
});

client.on('ready', EVENTS.ready);
client.on('guildMemberUpdate', EVENTS.guildMemberUpdate);
client.on('messageCreate', EVENTS.messageCreate);

// ... your setInterval code ...

client.login(CONFIG.token);
