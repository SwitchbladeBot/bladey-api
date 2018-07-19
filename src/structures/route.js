/**
 * Base route structure
 * @constructor
 * @param {Wrapper} wrapper - API Wrapper
 */
module.exports = class Route {
  constructor (client, parentRoute) {
    this.client = client

    this.name = 'RouteName'

    this.requirements = null // Run requirements
    this.parentRoute = parentRoute
  }

  /**
   * Returns true if it can load
   * @returns {boolean} Whether this route can load
   */
  canLoad () {
    return true
  }
  /*
  path () {

  } */

  /**
   * Returns true if it can run
   * @param {Array<string>} args - Request arguments
   * @returns {boolean} Whether this command can run
   */
  handleRequirements (args) {
    return this.requirements ? this.requirements.handle(args) : true
  }
}
