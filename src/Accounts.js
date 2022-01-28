const BaseApi = require('./BaseApi')

class Accounts extends BaseApi {
  constructor() {
    super()
  }

  search(term = '') {
    if (!term) {
      throw new Error('accounts.search: Invalid empty search')
    }
    return this.request(`/accounts/search/${term}`).then((res) => {
      if (!res.data) {
        throw new Error('Invalid response')
      }
      return res.data.map((userRes) => {
        return {
          ...userRes.attributes,
          id: userRes.id
        }
      })
    }).catch((error) => {
      console.error(`accounts.search ERROR: ${error}`)
      return []
    })
  }

  user(userId) {
    if (!userId) {
      throw new Error('accounts.user: Invalid userId ' + userId)
    }
    return this.request(`/accounts/${userId}`).then((res) => {
      if (!res.data) {
        throw new Error('Invalid response')
      }
      return {
        ...res.data.attributes,
        id: res.data.id
      }
    }).catch((error) => {
      console.error(`accounts.user ERROR: ${error}`)
      return null
    })
  }

  userMatches(userId, page = 1, size = 10, ranked = false) {
    if (!userId) {
      throw new Error('accounts.userMatches: Invalid userId ' + userId)
    }
    return this.request(`/accounts/${userId}/matches${ranked ? '/ranked' : ''}?page[number]=${page}&page[size]=${size}`).then((res) => {
      if (!res.data) {
        throw new Error('Invalid response')
      }
      var { data, included, links } = res
      var matches = data.map((match) => {
        var rounds = match.relationships.rounds.data
        return {
          id: match.id,
          ...match.attributes,
          rounds: rounds.map((round) => {
            return included.find(r => r.id === round.id)
          })
        }
      })
      return {
        matches,
        next: () => links.next ? this.userMatches(userId, page + 1, size, ranked) : null,
        prev: () => links.prev ? this.userMatches(userId, page - 1, size, ranked) : null
      }
    }).catch((error) => {
      console.error(`accounts.userMatches ERROR: ${error}`)
      return null
    })
  }

  userEloHistory(userId) {
    if (!userId) {
      throw new Error('accounts.userEloHistory: Invalid userId ' + userId)
    }
    return this.request(`/accounts/${userId}/elo-history`).then((res) => {
      if (!res.data) {
        throw new Error('Invalid response')
      }
      return res.data.map(match => {
        return {
          ...match.attributes,
          id: match.id
        }
      })
    }).catch((error) => {
      console.error(`accounts.userEloHistory ERROR: ${error}`)
      return null
    })
  }
}
module.exports = Accounts