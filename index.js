// Load Express and CORS
const app = require('express')()
const cors = require('cors')
const port = process.env.PORT || 8000

// Load Routers
const contributors = require('./routers/contributors.js')

// Use CORS with Express
app.use(cors())

// Point contributors route to uri/contributors
app.use('/contributors', contributors)

// Start application with port 8000 or process.env.PORT
app.listen(port, () => { console.log(`Listening on port ${port}`) })
