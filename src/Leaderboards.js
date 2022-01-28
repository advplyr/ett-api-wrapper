const BaseApi = require('./BaseApi')

class Leaderboards extends BaseApi {
  constructor() {
    super()
  }

  get(start = 0) {
    if (isNaN(start) || start < 0) {
      throw new Error('leaderboards.get: Invalid start ' + start)
    }
    return this.request(`/leaderboards?start=${start}`).then((res) => {
      return {
        ...res,
        start,
        next: () => res.scores.length < 10 ? null : this.get(start + 10)
      }
    }).catch((error) => {
      console.error(`leaderboards.get ERROR: ${error}`)
      return []
    })
  }
}
module.exports = Leaderboards