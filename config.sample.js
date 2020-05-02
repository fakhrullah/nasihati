module.exports = {

  // -------------- Back-end config -----------------------------

  /**
   * Environment
   *
   * Use production as default for security. Other environment must specified.
   */
  env: 'production', // production, development, test

  /**
   * Port number where app should start.
   */
  port: 3000,

  /**
   * Database
   */
  db_host: 'localhost:27017',
  db_name: 'nasihat',
  db_user: '',
  db_pass: '',
  db_url: function () {
    return `mongodb://${this.db_host}/${this.db_name}`
  }

  /**
   * Email
   */

  // -------------- Front-end config -----------------------------

  /**
   * Api
   *
   * If you want http://nasihat.fajarhac.com api key, please contact me.
   */
  apikey: 'Pj209tsl7rxg0efC52yE8' //
}
