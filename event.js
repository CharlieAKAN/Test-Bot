const { commands } = require('./commands.js');

const userConversationLogs = new Map();
const lastMessageTimestamp = new Map();

function eventHandlers(client, openai) {
  client.on('ready', () => {
    console.log('The bot is online!');
  });

  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const roleName = 'Join Streamers';
    const channelId = process.env.JOIN_CHANNEL_ID;

    const role = newMember.guild.roles.cache.find(role => role.name === roleName);

    if (!oldMember.roles.cache.has(role.id) && newMember.roles.cache.has(role.id)) {
      const channel = newMember.guild.channels.cache.get(channelId);
      channel.send(`Hello, <@${newMember.id}>! You have been assigned the ${roleName} role. Please join Streamer VC when you are ready!`);
    }
  });

  commands(client, openai);
}

module.exports = {
  eventHandlers,
  userConversationLogs,
  lastMessageTimestamp,
};