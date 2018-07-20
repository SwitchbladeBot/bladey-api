/**
 * Base route structure
 * @constructor
 * @param {Client} client - discord.js Client
 * @param {Route} parentRoute - parent route to inherit path
 */
module.exports = class Route {
  constructor (client, parentRoute) {
    this.client = client

    this.name = 'RouteName'

    this.requirements = null
    this.parentRoute = parentRoute
  }

  get path () {
    return `${this.parentRoute || ''}/${this.name}`
  }

  /**
   * Return an express Router with routes information
   * @returns {express.Router}
   */
  load () {
    return null
  }

  /**
   * Returns true if it can load
   * @returns {boolean} Whether this route can load
   */
  canLoad () {
    return true
  }

  /**
   * Returns true if it can run
   * @param {Array<string>} args - Request arguments
   * @returns {boolean} Whether this route can run
   */
  handleRequirements (args) {
    return this.requirements ? this.requirements.handle(args) : true
  }
}
