Taken from this repo: https://github.com/bbc/delivery-engineering/blob/main/docs/examples/codepipeline/common-roles-and-resources/README.md

# Common 

## Context

These set of stack help solve the problem of setting up a CodePipeline for cross account deployment. So one tooling account, along with a dev and prod account. With the tooling account having a pipeline which deploys infrastructure into both accounts.

These examples assume you have all three accounts.

## How to deploy
- Step 1: Deploy [step-1.yml](step-1.yml) in the tooling account, with the name `ci-build-part-1`
- Step 2: Deploy [step-2.yml](step-2.yml) in the service accounts (e.g. dev and prod), with the name `ci-build-roles`
- Step 3: Deploy [step-3.yml](step-3.yml) in the tooling account, with the name `ci-build-part-2`

### Notes for deploying:
- some stacks have parameters, please add values for all of them.
- you can deploy using the AWS Console or AWS Cli.

Please note you will also need to grant users access. To do this setup the appropriate permissions in [bbc/aws-access](https://github.com/bbc/aws-access) repo.
