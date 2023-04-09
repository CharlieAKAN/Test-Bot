const { client } = require('./client');
const { handleCommand } = require('./commands');
const { PREFIX } = require('./config');

client.on('ready', () => {
  console.log('The bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;

  const isCommand = message.content.startsWith(PREFIX);
  if (isCommand) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    handleCommand(command, args, message, client);
  } else {
    handleCommand(null, null, message, client);
  }
});
