// ID of the channel you want to send the message to
const channelId = "code";
 const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN;

try {
  // Call the chat.postMessage method using the WebClient
  const result = await client.chat.postMessage({
    channel: channelId,
    token:SLACK_API_TOKEN,
    text: "Teste"
  });

  console.log(result);
}
catch (error) {
  console.error(error);
}
