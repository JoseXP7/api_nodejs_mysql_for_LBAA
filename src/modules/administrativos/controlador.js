const TABLA = 'administrativo'

module.exports = function (dbInyectada) {
  let db = dbInyectada

  if (!db) {
    db = require('../../db/mysql')
  }

  function todos() {
    return db.todos(TABLA)
  }

  function uno(cedula) {
    return db.unoCedula(TABLA, cedula)
  }

  function actualizar(body) {
    return db.actualizar(TABLA, body)
  }

  function agregar(body) {
    return db.agregar(TABLA, body)
  }

  function eliminar(body) {
    return db.eliminar(TABLA, body)
  }

  return {
    todos,
    uno,
    actualizar,
    agregar,
    eliminar,
  }
}
