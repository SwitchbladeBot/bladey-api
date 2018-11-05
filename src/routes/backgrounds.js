const { Route } = require('../index')
const { Router } = require('express')

module.exports = class Backgrounds extends Route {
  constructor (client) {
    super(client)
    this.name = 'backgrounds'
  }

  register (app) {
    const router = Router()

    router.get('/', async (req, res) => {
      const backgrounds = await this.client.database.backgrounds.findAll()

      res.json({ backgrounds })
    })
    router.get('/:id', async (req, res) => {
      const id = req.params.id
      const background = await this.client.database.backgrounds.get(id)

      res.json({ background })
    })
    app.use(this.path, router)
  }
}
