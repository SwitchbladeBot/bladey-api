const { Route } = require('../index')
const { Router } = require('express')



module.exports = class Background extends Route {
  constructor (client) {
    super(client)
    this.name = 'background'
  }
  register (app) {
      const router = Router()

      // Get backgrounds
      router.get('/', async (req, res) => {
         // const bgs = await this.client.database.backgrounds.findAll()
        res.json({"oao":"oao"})
      })
    
    
      
    app.use(this.path, router)
  }
}
