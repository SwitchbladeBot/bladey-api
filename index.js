const app = require('express')()
const port = process.env.PORT || 8000
const SnowTransfer = require('snowtransfer')
const client = new SnowTransfer(process.env.DISCORD_TOKEN)

app.get('/contributors', (req, res) => {

})

app.listen(port)
