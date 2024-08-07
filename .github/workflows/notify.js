
const { WebClient } = require('@slack/web-api');

const channelId = "code";
const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN;
const client = new WebClient(SLACK_API_TOKEN);

const github = require('@actions/github');
const context = github.context;

async function sendSlackMessage() {
  try {
    const pullRequestData = {
      title: context.payload.pull_request.title,
      author:context.payload.pull_request.user.login,
      repoName: context.repo.repo,
      branchName:context.payload.pull_request.head.ref,
      pullRequestUrl: context.payload.pull_request.html_url
      
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
            text: `*Title:* ${pullRequestData.title}\n*Repository*: ${pullRequestData.repoName}\n*Branch:* ${pullRequestData.branchName}\n*Author:* ${pullRequestData.author}\n*Pull Request URL:* ${pullRequestData.pullRequestUrl}`
          }
        },
        {
          type: 'divider'
        }
      ]
    }

    
    const result = await client.chat.postMessage({
      channel:message.channel,
      blocks:message.blocks,
      token: SLACK_API_TOKEN
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

sendSlackMessage();
