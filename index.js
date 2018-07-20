// Define constants
const API = require('./src/api.js')
const wrapper = new API({
  port: process.env.PORT,
  token: process.env.DISCORD_TOKEN
})

// Initialize API
wrapper.start().then(() => wrapper.log(`Wrapper initialized successfully`, 'API')).catch(wrapper.logError)
