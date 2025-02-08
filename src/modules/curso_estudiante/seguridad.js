const authentication = require('../../authentication')

module.exports = function chequearAuth() {
  function middleware(req, res, next) {
    authentication.chequearToken.confirmarToken(req)
    next()
  }

  return middleware
}
