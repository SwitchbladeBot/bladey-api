// Define constants
const API = require('./src/api.js')
const wrapper = new API()

// Initialize API
wrapper.start(process.env.PORT || 8000, process.env.DISCORD_TOKEN).then(() => wrapper.log(`Wrapper initialized successfully`, 'API')).catch(e => wrapper.logError(e))
