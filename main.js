// main.js
require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { getRandomConversationStarter } = require('./openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

// Export the client
module.exports.client = client;

// Import the events
require('./events');

let lastMessageTimestamp = Date.now();

setInterval(async () => {
  const currentTime = Date.now();
  const timeSinceLastMessage = currentTime - lastMessageTimestamp;
  const idleTimeLimit = 120 * 60 * 1000; // 2 hours in milliseconds
  if (timeSinceLastMessage >= idleTimeLimit) {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    const conversationStarter = await getRandomConversationStarter();
    channel.send(conversationStarter);
    lastMessageTimestamp = Date.now();
  }
}, 60 * 1000); // Check every minute

client.login(process.env.TOKEN);
