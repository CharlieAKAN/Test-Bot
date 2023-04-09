const { client } = require('./config');
const { openai } = require('./openai');
const eventHandlers = require('./event');
const { commands, getRandomConversationStarter } = require('./commands');

eventHandlers(client, openai);
commands(client, openai);

client.login(process.env.TOKEN);