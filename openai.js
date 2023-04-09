const { openai } = require('./main');
const { client } = require('./main');

async function respondToUser(message) {
  if (!userConversationLogs.has(message.author.id)) {
    userConversationLogs.set(message.author.id, [
      {
        role: 'system',
        content:
          'Your personality that is rude but funny, witty, and sarcastic. Your goal is to make people laugh when you talk to them. When encountering inappropriate or disrespectful questions, engage with them in a witty and sarcastic manner without being overly offensive. Make your responses entertaining and humorous while staying on topic.',
      },
    ]);
  }

  const conversationLog = userConversationLogs.get(message.author.id);

  let prevMessages = await message.channel.messages.fetch({ limit: 15 });
  prevMessages.reverse();
  prevMessages.forEach((msg) => {
    let content = msg.content;

    if (msg.author.id === client.user.id) {
      content = content.replace(/<@[!]?[0-9]+>/g, (match, index) => {
        return index === 0 ? `<@${message.author.id}>` : '';
      });
      conversationLog.push({ role: 'assistant', content });
    } else if (msg.author.id === message.author.id) {
      conversationLog.push({ role: 'user', content: `${content} In your response, mention me only once.` });
    }
  });

  conversationLog.push({ role: 'user', content: message.content });

  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversationLog,
    temperature: 0.5,
    max_tokens: 300,
    n: 3,
  });

  const botMentionRegex = new RegExp(`@${client.user.username}`, 'g');
  let responseContent = result.data.choices[0].message.content;

  if (message.reference && message.reference.messageId) {
    const replyToBot = (await message.channel.messages.fetch(message.reference.messageId)).author.id === client.user.id;
    if (replyToBot) {
      responseContent = responseContent.replace(botMentionRegex, `<@${message.author.id}>`);
    }
  }

  conversationLog.push({ role: 'assistant', content: responseContent });

  if (conversationLog.length > CONVERSATION_LOG_LIMIT * 2) {
    conversationLog.splice(0, 2);
  }

  return responseContent;
}

module.exports = {
  respondToUser,
};
