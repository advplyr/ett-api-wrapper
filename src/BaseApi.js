const https = require('https')

class BaseApi {
  constructor() {
    this.baseUrl = 'https://www.elevenvr.club/'
  }

  request(endpoint) {
    return new Promise((resolve, reject) => {
      https.get(`${this.baseUrl}${endpoint}`, res => {
        let data = []

        if (res.statusCode == 404) {
          return reject('404: Not Found')
        } else if (res.statusCode == 400) {
          return reject('400: Bad Request')
        } else if (res.statusCode == 500) {
          return reject('500: Server Error')
        } else if (res.statusCode != 200) {
          console.log('Status Code:', res.statusCode)
        }

        res.on('data', chunk => {
          data.push(chunk)
        })
        res.on('end', () => {
          if (!data || !data.length) return reject('Empty Response')
          resolve(JSON.parse(Buffer.concat(data).toString()))
        })
      }).on('error', err => {
        reject(err)
      })
    })
  }
}
module.exports = BaseApi