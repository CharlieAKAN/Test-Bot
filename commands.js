const PREFIX = process.env.PREFIX || '!';

const userConversationLogs = require('./event.js').userConversationLogs;
const lastMessageTimestamp = require('./event.js').lastMessageTimestamp;

const TOPICS = [
  'movie facts',
  'gaming history',
  'the best video games',
  'video games from 1990 to 2020',
  'game character',
];

async function generateConversationStarter(topic) {
  const conversationLog = [
    {
      role: 'system',
      content:
        'Your personality that is rude but funny, witty, and sarcastic. Your goal is to make people laugh when you talk to them. When encountering inappropriate or disrespectful questions, engage with them in a witty and sarcastic manner without being overly offensive. Make your responses entertaining and humorous while staying on topic.'
    },
    {
      role: 'user',
      content: `Tell the Discord server something interesting about ${topic}.`
    }
  ];
    
const result = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
      temperature: 0.5,
      max_tokens: 300,
      n: 3,
    })
    .catch((error) => {
      console.log(`OPENAI ERR: ${error}`);
      console.log('Error response:', error.response.data); // Add this line
    });
}

const userConversationLogs = new Map();
const CONVERSATION_LOG_LIMIT = 10;

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const roleName = 'Join Streamers';
  const channelId = process.env.JOIN_CHANNEL_ID;

  const role = newMember.guild.roles.cache.find(role => role.name === roleName);

  if (!oldMember.roles.cache.has(role.id) && newMember.roles.cache.has(role.id)) {
    const channel = newMember.guild.channels.cache.get(channelId);
    channel.send(`Hello, <@${newMember.id}>! You have been assigned the ${roleName} role. Please join Streamer VC when you are ready!`);
  }
});

function commands(client, openai) {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHANNEL_ID) return;

    const botUsername = `${client.user.username}#${client.user.discriminator}`;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

  if (command === 'help') {
    // Send a list of available commands
    message.channel.send('Available commands:\n- help\n- topic');
  } file
  });
}

module.exports = {
  commands,
};