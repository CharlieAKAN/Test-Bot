// events.js
const { client } = require('./main');
const { handleCommand } = require('./commands');
const { PREFIX } = require('./config');

client.on('ready', () => {
  console.log('The bot is online!');
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const roleName = 'STOA Streamers';
  const channelId = process.env.JOIN_CHANNEL_ID;

  const role = newMember.guild.roles.cache.find(role => role.name === roleName);

  if (!oldMember.roles.cache.has(role.id) && newMember.roles.cache.has(role.id)) {
    const channel = newMember.guild.channels.cache.get(channelId);
    if (channel) {
      channel.send(`Hello, <@${newMember.id}>! You have been assigned the ${roleName} role. Please join Streamer VC when you are ready!`);
    } else {
      console.error(`Unable to find channel with ID: ${channelId}`);
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const isMention = message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`);
  const isReply = message.reference && message.reference.messageId && (await message.channel.messages.fetch(message.reference.messageId)).author.id === client.user.id;

  if (isMention || isReply) {
    message.channel.sendTyping(); // Add typing indicator
    handleCommand(command, args, message);
  } else if (message.content.startsWith(PREFIX)) {
    handleCommand(command, args, message);
  }
});
