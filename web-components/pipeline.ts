import * as cdk from '@aws-cdk/core'
import { Bucket } from '@aws-cdk/aws-s3'
import { TVRPipeline } from 'tvr-pipeline-cdk'
import { AWS_ACCOUNTS, SLACK_CHANNEL } from '../config'

const repo = 'bbc/iplayer-web-components'

// The App Infrastructure
class MyStage extends cdk.Stage {
  constructor (scope: cdk.Construct, id: string, props: cdk.StageProps) {
    super(scope, id, props)

    const mainStack = new cdk.Stack(this, 'MainStack')
    new Bucket(mainStack, 'MyFirstBucket')
  }
}

// The CI Stack
const app = new cdk.App()
const stack = new cdk.Stack(app, 'WebComponentsPipelineStack', {
  env: {
    account: AWS_ACCOUNTS['iPlayer Pipelines'],
    region: 'eu-west-1'
  }
})

const { pipeline } = new TVRPipeline(stack, 'Pipeline', {
  repo,
  slackChannel: SLACK_CHANNEL.IPLAYER_WEB_BROWSE
})

// pipeline.addStage(new MyStage(stack, 'Test-MainStage', {
//   env: {
//     account: '111111111111',
//     region: 'eu-west-1'
//   }
// }))
