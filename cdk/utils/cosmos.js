const asyncFs = require('fs').promises
const path = require('path')
const https = require('https')

async function httpsRequest (url, cert) {
  const certData = await asyncFs.readFile(cert)
  const options = {
    key: certData,
    cert: certData
  }
  return new Promise((resolve, reject) => {
    var req = https.request(url, options, function (res) {
      let resData = ''
      res.on('data', function (data) {
        resData = resData + data
      })
      res.on('end', function () {
        resolve(resData)
      })
    })
    req.end()
    req.on('error', function (e) {
      reject(e)
    })
  })
}

const getCredentials = async (account) => {
  const wormholeUrl = `https://wormhole.api.bbci.co.uk/account/${account}/credentials`
  const wormholeResponse = await httpsRequest(wormholeUrl, path.resolve(process.env.CLIENT_CERT))
  return JSON.parse(wormholeResponse)
}

module.exports = {
  getCredentials
}
