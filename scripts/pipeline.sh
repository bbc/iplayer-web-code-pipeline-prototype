set -e

export AWS_REGION=eu-west-1

curl \
  --silent \
  --cert $CLIENT_CERT \
  --key $CLIENT_KEY \
  "https://wormhole.api.bbci.co.uk/account/979446310614/credentials" \
  -o credentials.json

export AWS_ACCESS_KEY_ID=$(cat credentials.json | jq -r .accessKeyId)
export AWS_SECRET_ACCESS_KEY=$(cat credentials.json | jq -r .secretAccessKey)
export AWS_SESSION_TOKEN=$(cat credentials.json | jq -r .sessionToken)

npx cdk deploy
