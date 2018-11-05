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

    app.use(this.path, router)
  }
}
