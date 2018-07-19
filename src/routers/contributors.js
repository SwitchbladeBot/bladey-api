const { Route } = require('../../index')
const express = require('express')
const router = express.Router()

module.exports = class Contributors extends Route {
  constructor (client) {
    super(client)
    this.name = 'contributors'
  }

  path () {
    router.get('/', async (req, res) => {
      const roles = this.client.guilds.get(process.env.BOT_GUILD).roles
      const members = this.client.guilds.get(process.env.BOT_GUILD).members

      const alreadyFound = []
      const contributorRoles = roles
        .filter(r => r.hoist)
        .sort((a, b) => b.position - a.position)
        .map(role => {
          return {
            id: role.id,
            name: role.name,
            members: members.map(member => {
              if (member.roles.includes(role.id) && !member.user.bot && !alreadyFound.includes(member.id)) {
                alreadyFound.push(member.id)
                return member.user
              }
            }).filter(u => u)
          }
        }).filter(r => r.members.length > 0)

      res.json({roles: contributorRoles})
    })
  }
}
