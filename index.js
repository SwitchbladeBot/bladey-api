const app = require('express')()
const cors = require('cors')
const port = process.env.PORT || 8000
const SnowTransfer = require('snowtransfer')
const client = new SnowTransfer(process.env.DISCORD_TOKEN)

app.use(cors())

// TODO: Use a method that doesn't break when we reach 1000 members
// TODO: Optimize this method to only display the informaiton we need
app.get('/contributors', async (req, res) => {
  const roles = await client.guild.getGuildRoles(process.env.BOT_GUILD)
  const members = await client.guild.getGuildMembers(process.env.BOT_GUILD, {limit: 1000})
  const rolesToDisplay = roles.filter(r => r.hoist).sort((a, b) => {return b.position - a.position})

  const contributors = members.filter(m => {
    return m.roles.some(r => {
      return rolesToDisplay.map(r => r.id).includes(r)
    })
  })

  let alreadyFound = []

  const contributorList = rolesToDisplay.map(r => {
    return {
      roleName: r.name,
      roleId: r.id,
      people: contributors.filter(c => {
        if (c.roles.includes(r.id) && !c.user.bot && !alreadyFound.includes(c.user.id)) {
          alreadyFound.push(c.user.id)
          return true
        } else return false
      })
    }
  }).filter(r => {return r.people.length > 0})
  res.json(contributorList)
})

app.listen(port)
console.log(`Listening on port ${port}...`)