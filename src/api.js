// Load Express, CORS and discord.js
const app = require('express')()
const cors = require('cors')
const { Client } = require('discord.js')

const { Route, FileUtils } = require('./')

/**
 * API Wrapper
 * @constructor
 * @param {Object} options - Wrapper options.
 */
module.exports = class Wrapper extends Client {
  constructor (options = {}) {
    super(options)
    this.app = {}
    this.routes = {}
    this.initializeRoutes('src/routers/')
  }

  /**
   * Initializes the API Wrapper and the Discord Client
   * @param {string} [port] - Web port used
   * @param {string} [token] - Discord application token used for authentication with Discord
   * @returns {Promise<string>} - Token of the account used
   */
  start (port, token) {
    // Use CORS with Express
    app.use(cors())

    // Listen to chosen web port
    app.listen(port, () => {
      this.log(`Listening on port ${port}`, 'API')
      this.app = app
    })

    // Log in the client
    return super.login(token)
  }

  // Helpers

  /**
   * Adds a new log entry to the console
   * @param {string} message - Message to be logged
   * @param {...string} [tags] - Tags to identify the log entry
   */
  log (...args) {
    const message = args[0]
    const tags = args.slice(1).map(t => `[${t}]`)
    console.log(...tags, message)
  }

  /**
   * Adds a new error log entry to the console.
   * @param {string} message - Error message
   */
  logError (...args) {
    const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
    console.error('[Error]', ...tags, args[args.length - 1])
  }

  // Routes

  /**
   * Adds a new route to the wrapper
   * @param {Route} route - Route to be added
   */
  addRoute (route) {
    if (route instanceof Route && route.canLoad()) {
      this.routes.push(route)
      app.use(`/${route.name}`, route.path)
    }
  }

  /**
   * Initializes all wrapper routes
   * @param {string} dirPath - Path to the routes directory
   */
  initializeRoutes (dirPath) {
    return FileUtils.requireDirectory(dirPath, (NewRoute) => {
      if (Object.getPrototypeOf(NewRoute) !== Route || NewRoute.ignore) return
      this.addRoute(new NewRoute(this))
      this.log(`${NewRoute.name} loaded.`, 'Routes')
    }, this.logError)
  }
}

/* // Load Routers
const { contributors } = require('./routers/')

// Use CORS with Express
app.use(cors())

// Point contributors route to uri/contributors
app.use('/contributors', contributors)

// Start application with port 8000 or process.env.PORT
app.listen(port, () => { console.log(`Listening on port ${port}`) })
*/
