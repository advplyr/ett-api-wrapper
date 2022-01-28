const BaseApi = require('./BaseApi')

class Accounts extends BaseApi {
  constructor() {
    super()
  }

  get(user1, user2) {
    if (!user1 || !user2) {
      throw new Error('matches.get: Invalid user1 or user2')
    }
    return this.request(`/matchup/${user1}/${user2}`).then((res) => {
      if (!res.data) {
        throw new Error('Invalid response')
      }
      var { data, included } = res
      return data.map((match) => {
        var rounds = match.relationships.rounds.data
        return {
          id: match.id,
          ...match.attributes,
          rounds: rounds.map((round) => {
            return included.find(r => r.id === round.id)
          })
        }
      })
    }).catch((error) => {
      console.error(`matches.get ERROR: ${error}`)
      return []
    })
  }
}
module.exports = Accounts