const BaseApi = require('./BaseApi')

class Matches extends BaseApi {
  constructor() {
    super()
  }

  get(page = 1, size = 25) {
    return this.request(`/api/v1/matches?page[number]=${page}&page[size]=${size}`).then((res) => {
      if (!res.data) {
        throw new Error('Invalid response')
      }
      var { data, links } = res
      var matches = data.map((match) => {
        return {
          id: match.id,
          ...match.attributes
        }
      })
      return {
        matches,
        next: () => links.next ? this.get(page + 1, size) : null,
        prev: () => links.prev ? this.get(page - 1, size) : null
      }
    }).catch((error) => {
      console.error(`matches.get ERROR: ${error}`)
      return []
    })
  }

  matchup(user1, user2) {
    if (!user1 || !user2) {
      throw new Error('matches.matchup: Invalid user1 or user2')
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
module.exports = Matches