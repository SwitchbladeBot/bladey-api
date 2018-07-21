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

    /**
     * @api {get} /guild/members/:guildId Request guild member count
     * @apiName GetGuildMemberCount
     * @apiGroup Guilds
     *
     * @apiParam {String} guildId Guild ID
     *
     * @apiSuccess {Number} members Current members that guild has
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "members": 350
     *     }
     *
     * @apiError GuildNotFound Guild not found
     *
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 404 Not Found
     *    {
     *      "error": "Guild not found"
     *    }
     */
    router.get('/members/:guildId', async (req, res) => {
      const guild = this.client.guilds.get(req.params.guildId)
      if (!guild) return res.status(404).json({error: 'Guild not found'})
      else return res.json({members: guild.members.size})
    })

    return router
  }
}
