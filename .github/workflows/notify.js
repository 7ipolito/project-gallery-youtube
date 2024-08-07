const { WebClient } = require('@slack/web-api');

// ID do canal para onde você quer enviar a mensagem
const channelId = "code";
const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN;
const client = new WebClient(SLACK_API_TOKEN);

const github = require('@actions/github');
const context = github.context;

async function sendSlackMessage() {
  try {
    // const pullRequestData = {
    //   id:context.payload.PULL_REQUEST_ID,
    //   title:context.payload.PULL_REQUEST_TITLE,
    //   url:context.payload.PULL_REQUEST_URL,
    //   author:context.payload.PULL_REQUEST_AUTHOR,
    //   state:context.payload.PULL_REQUEST_STATE,
    //   repoName: context.repo.repo,
    //   branchName:context.payload.pull_request.head.ref,
    //   pullRequestUrl: context.payload.pull_request.html_url
      
    // };
  
    const pullRequestData = {
      title: 'Fix issue with login',
      pullRequestUrl: 'https://github.com/your-repo/pull/123',
      user: 'john_doe',
      branchName:"main",
      state: 'opened',
      repoName: 'your-repo'
    };

    const message ={
      channel: channelId,
      blocks: [
        {
          type: 'section',
          block_id: 'pr-section',
          text: {
            type: 'mrkdwn',
            text: `New Pull Request on Project Youtube 🎥`
          }
        },
        {
          type: 'section',
          block_id: 'pr-details',
          text: {
            type: 'mrkdwn',
            text: `*Repository:* ${pullRequestData.repoName}\n*Tittle: ${pullRequestData.title}\n*Branch:* ${pullRequestData.branchName}\n*Author:* ${pullRequestData.author}\n*Pull Request URL:* ${pullRequestData.pullRequestUrl}`
          }
        },
        {
          type: 'divider'
        }
      ]
    }

    
    const result = await client.chat.postMessage({
      message
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Chama a função assíncrona
sendSlackMessage();