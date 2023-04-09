const IntentsBitField = require('discord.js').IntentsBitField;

const CONFIG = {
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
  prefix: process.env.PREFIX || '!',
  joinChannelId: process.env.JOIN_CHANNEL_ID,
  channelId: process.env.CHANNEL_ID,
  token: process.env.TOKEN,
  roleName: 'Join Streamers',
  conversationLogLimit: 10,
};

module.exports = CONFIG;