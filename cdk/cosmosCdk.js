const path = require('path')
const { spawn } = require('child_process')
const cosmos = require('./utils/cosmos')

async function command (args) {
  const credentials = await cosmos.getCredentials(979446310614)
  process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId
  process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey
  process.env.AWS_SESSION_TOKEN = credentials.sessionToken
  process.env.AWS_DEFAULT_REGION = 'eu-west-1'
  const command = 'npx'
  args = ['cdk'].concat(...args)
  console.log(command, ...args)
  await new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: path.join(__dirname, '../'),
      stdio: 'inherit'
    })

    proc.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error('Deploy exited with code: ' + code))
      }
    })
  })
}

command(process.argv.slice(2))
