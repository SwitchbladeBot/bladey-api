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
     * @api {get} /guilds/members/:guildId Request guild member count
     * @apiName GetGuildMemberCount
     * @apiGroup Guilds
     *
     * @apiParam {String} guildId Guild ID
     *
     * @apiSuccess {String} id Guild ID
     * @apiSuccess {String} name Guild Name
     * @apiSuccess {String} icon Guild Icon URL
     * @apiSuccess {Number} memberCount Current guild's member count
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "445203868624748555"
     *       "name": "Switchblade Bot",
     *       "icon": "ebdb8b08b366e6acc563e8d3e819bdf6",
     *       "memberCount": 350
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
      if (guild) {
        const { id, name, icon, memberCount } = guild
        return res.json({id, name, icon, memberCount})
      }
      res.status(404).json({error: 'Guild not found'})
    })

    router.ws('/members/:guildId', (ws, req) => {
      const guild = this.client.guilds.get(req.params.guildId)
      if (!guild) ws.close(404, 'Guild not found')
      let count = guild.memberCount
      ws.send(count)
      const update = (member, shouldAdd) => {
        if (member.guild !== guild) return
        (shouldAdd) ? count++ : count--
        ws.send(count)
      }
      const add = member => { update(member, true) }
      const remove = member => { update(member, false) }
      this.client.on('guildMemberAdd', add)
      this.client.on('guildMemberRemove', remove)
      ws.on('close', () => {
        this.client.removeListener('guildMemberAdd', add)
        this.client.removeListener('guildMemberRemove', remove)
      })
    })

    return router
  }
}
