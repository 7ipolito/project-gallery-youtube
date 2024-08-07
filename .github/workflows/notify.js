const { WebClient } = require('@slack/web-api');

// ID do canal para onde você quer enviar a mensagem
const channelId = "code";
const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN;
const client = new WebClient(SLACK_API_TOKEN);

async function sendSlackMessage() {
  try {
    // Chama o método chat.postMessage usando o WebClient
    const result = await client.chat.postMessage({
      channel: channelId,
      text: "Teste"
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Chama a função assíncrona
sendSlackMessage();