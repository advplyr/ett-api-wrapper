const Accounts = require('./Accounts')
const Matches = require('./Matches')

class Ett {
  constructor() {
    this.accounts = new Accounts()
    this.matches = new Matches()
  }
}
module.exports = new Ett()