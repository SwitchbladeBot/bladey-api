const { Route } = require('../index')
const { Router } = require('express')
const rp = require('request-promise-native')

module.exports = class Users extends Route {
  constructor (client) {
    super(client)
    this.name = 'users'
  }

  load () {
    const router = Router()

    router.post('/@me', async (req, res) => {
      const authorization = req.headers.authorization
      if (!authorization) return res.status(401).json({ success: false, error: 'Unauthorized' })
      const request = await rp.get({ url: 'https://discordapp.com/api/v6/users/@me', headers: { 'Authorization': `Bearer ${authorization}` } })
      if (!request) return res.status(401).json({ success: false, error: 'Unauthorized' })
      res.status(200).json(JSON.parse(request))
      /*
      const body = req.body
      if (!body) return res.status(401).json({ success: false, error: 'Unauthorized' })
      res.status(200).json({ success: true }) */
    })

    return router
  }
}
