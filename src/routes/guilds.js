const { Route } = require('../index')
const { Router } = require('express')

module.exports = class Guilds extends Route {
  constructor (client) {
    super(client)
    this.name = 'guilds'
  }

  load () {
    const router = Router()

    router.post('/common', async (req, res) => {
      const { body } = req
      if (body) {
        const guilds = body instanceof Array ? body : body.guilds instanceof Array ? body.guilds : null
        if (guilds) {
          const common = guilds.filter(id => this.client.guilds.map(g => g.id).includes(id))
          return res.json(common)
        }
      }
      res.status(400).json({error: 'Invalid request'})
    })

    router.get('/members/:id', async (req, res) => {
      const guild = this.client.guilds.get(req.params.id)
      if (!guild) return res.status(400).json({error: 'Guild not found'})
      else return res.json(guild.members.size)
    })

    return router
  }
}
