// config.js
const PREFIX = process.env.PREFIX || '!';
const TOPICS = [
  'movie facts',
  'gaming history',
  'the best video games',
  'video games from 1990 to 2020',
  'game character',
];
const CONVERSATION_LOG_LIMIT = 10; // Adjust the limit as needed

module.exports = {
  PREFIX,
  TOPICS,
  CONVERSATION_LOG_LIMIT,
};
