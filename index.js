const app = require('express')()
const port = process.env.PORT || 8000

app.get('/', (req, res) {
  res.send(JSON.stringify({ error: false, code: 200, message: 'It\'s alive!' }))
})

app.listen(port)
