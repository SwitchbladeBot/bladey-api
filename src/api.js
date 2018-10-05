// Load Express, CORS and discord.js
const express = require('express')
const app = express()
require('express-ws')(app)
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
    this.app = null
    this.routes = []
  }

  /**
   * Initializes the API Wrapper and the Discord Client
   * @param {string} [port] - Web port used
   * @param {string} [token] - Discord application token used for authentication with Discord
   * @returns {Promise<string>} - Token of the account used
   */
  start (port, token) {
    port = port || this.options.port || 8000
    token = token || this.options.token

    // Use CORS with Express
    app.use(cors())
    // Parse JSON body
    app.use(express.json())
    // Use 'docs' folder as actual documentation purposes
    console.log(__dirname)
    app.use(express.static(`${__dirname}/docs`))

    // Listen to chosen web port
    app.listen(port, () => {
      this.log(`Listening on port ${port}`, 'API')
      this.app = app
    })

    // Log in the client
    return this.login(token).then(t => {
      this.initializeRoutes('src/routes/').then(() => t)
    })
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
   * Adds a new route to the API
   * @param {Route} route - Route to be added
   */
  addRoute (route) {
    if (route instanceof Route && route.canLoad()) {
      const router = route.load()
      if (router) {
        this.routes.push(route)
        app.use(route.path, router)
      }
    }
  }

  /**
   * Initializes all routes
   * @param {string} dirPath - Path to the routes directory
   */
  initializeRoutes (dirPath) {
    return FileUtils.requireDirectory(dirPath, (NewRoute) => {
      if (Object.getPrototypeOf(NewRoute) !== Route) return
      this.addRoute(new NewRoute(this))
      this.log(`${NewRoute.name} loaded.`, 'Routes')
    }, this.logError)
  }
}
