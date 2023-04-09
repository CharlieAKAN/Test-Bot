const CONFIG = require('./config.js');
const COMMANDS = require('./commands.js');
const openai = require('./openai.js');

const EVENTS = {
  ready: () => {
    console.log('The bot is online!');
  },
  guildMemberUpdate: async (oldMember, newMember) => {
    // ... your guildMemberUpdate event code ...
  },
  messageCreate: async (message) => {
    // ... your messageCreate event code ...
  },
};

module.exports = EVENTS;
