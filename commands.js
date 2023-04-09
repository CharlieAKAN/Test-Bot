// commands.js
const { generateConversationStarter } = require('./openai');

async function handleCommand(command, args, message) {
  if (command === 'help') {
    // Send a list of available commands
    message.channel.send('Available commands:\n- help\n- topic');
  }

  if (command === 'topic') {
    const topic = args.join(' ');
    const conversationStarter = await generateConversationStarter(topic);
    message.channel.send(conversationStarter);
  }
}

module.exports = {
  handleCommand,
};
