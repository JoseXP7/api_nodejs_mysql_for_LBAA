const error = require('../../middleware/errors')

module.exports = function chequearRol(rolesPermitidos) {
  function middleware(req, res, next) {
    if (!rolesPermitidos.includes(req.user.rol)) {
      throw new error('No tienes permisos para realizar esta acción', 401)
    }
    next()
  }

  return middleware
}
