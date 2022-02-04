const BaseApi = require('./BaseApi')

class Snapshot extends BaseApi {
  constructor() {
    super()
  }

  get() {
    return this.getRequest('http://elevenlogcollector-env.js6z6tixhb.us-west-2.elasticbeanstalk.com/ElevenServerLiteSnapshot').then((res) => {
      return res
    }).catch((error) => {
      console.error(`snapshot.get ERROR: ${error}`)
      return []
    })
  }
}
module.exports = Snapshot