const Accounts = require('./Accounts')
const Matches = require('./Matches')
const Leaderboards = require('./Leaderboards')

class Ett {
  constructor() {
    this.accounts = new Accounts()
    this.matches = new Matches()
    this.leaderboards = new Leaderboards()
  }
}
module.exports = new Ett()