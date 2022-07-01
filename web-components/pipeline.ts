import * as cdk from '@aws-cdk/core';
// import { Bucket } from '@aws-cdk/aws-s3';
import { TVRPipeline } from 'tvr-pipeline-cdk';
import { AWS_ACCOUNTS, SLACK_CHANNEL } from '../config';

const repo = 'iplayer-web-components';

// The App Infrastructure
// class MyStage extends cdk.Stage {
//   constructor(scope: cdk.Construct, id: string, props: cdk.StageProps) {
//     super(scope, id, props);

//     const mainStack = new cdk.Stack(this, 'iplayer-web-components-main-stack');
//     new Bucket(mainStack, 'iplayer-web-components-bucket');
//   }
// }

// The CI Stack
const app = new cdk.App();
const stack = new cdk.Stack(app, 'iplayer-web-components-stack', {
  env: {
    account: AWS_ACCOUNTS.IPLAYER_PIPELINES,
    region: 'eu-west-1',
  },
});

const { pipeline } = new TVRPipeline(stack, 'iplayer-web-components-pipeline', {
  repo,
  slackChannel: SLACK_CHANNEL.IPLAYER_WEB_REL,
});

/**

Current Steps:

- Checkout from Source
- install deps
- test
- build


- 


 */

// pipeline.addStage(new cdk.Stage(stack, 'StageName', {env, outdir,}), {post, pre, stackSteps})

// pipeline.addStage(new MyStage(stack, 'Test-MainStage', {
//   env: {
//     account: AWS_ACCOUNTS.IPLAYER_WEB_DEV,
//     region: 'eu-west-1'
//   }
// }))
