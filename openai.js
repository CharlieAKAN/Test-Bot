// openai.js
const { Configuration, OpenAIApi } = require('openai');
const { TOPICS } = require('./config');

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

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

  return result.data.choices[0].message.content;
}

async function getRandomConversationStarter() {
  const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  return await generateConversationStarter(randomTopic);
}

module.exports = {
  generateConversationStarter,
  getRandomConversationStarter,
};
