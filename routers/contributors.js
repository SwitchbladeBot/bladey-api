const express = require('express')
const router = express.Router()

const SnowTransfer = require('snowtransfer')
const client = new SnowTransfer(process.env.DISCORD_TOKEN)

// TODO: Use a method that doesn't break when we reach 1000 members
// TODO: Optimize this method to only display the information we need
router.get('/', async (req, res) => {
  const roles = await client.guild.getGuildRoles(process.env.BOT_GUILD)
  const members = await client.guild.getGuildMembers(process.env.BOT_GUILD, { limit: 1000 })

  const alreadyFound = []
  const contributorRoles = roles
    .filter(r => r.hoist)
    .sort((a, b) => b.position - a.position)
    .map(role => {
      return {
        id: role.id,
        name: role.name,
        members: members.map(member => {
          if (member.roles.includes(role.id) && !member.user.bot && !alreadyFound.includes(member.user.id)) {
            alreadyFound.push(member.user.id)
            return member.user
          }
        }).filter(u => u)
      }
    }).filter(r => r.members.length > 0)

  res.json({roles: contributorRoles})
})

module.exports = router
