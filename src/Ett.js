const Accounts = require('./Accounts')
const Matches = require('./Matches')
const Leaderboards = require('./Leaderboards')
const Snapshot = require('./Snapshot')

class Ett {
  constructor() {
    this.accounts = new Accounts()
    this.matches = new Matches()
    this.leaderboards = new Leaderboards()
    this.snapshot = new Snapshot()
  }
}
module.exports = new Ett()