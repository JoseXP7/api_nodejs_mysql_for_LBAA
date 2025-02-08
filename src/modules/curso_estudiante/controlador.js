const TABLA = 'curso_estudiante'

module.exports = function (dbInyectada) {
  let db = dbInyectada

  if (!db) {
    db = require('../../db/mysql')
  }

  function todos() {
    return db.todos(TABLA)
  }

  function uno(id_estudiante) {
    return db.unoCursoEstudiante(TABLA, id_estudiante)
  }

  async function actualizar(body) {
    return db.actualizarCursoEstudiante(TABLA, body)
  }

  async function agregar(body) {
    return db.agregar(TABLA, body)
  }

  function eliminar(body) {
    return db.eliminarCursoEstudiante(TABLA, body)
  }

  return {
    todos,
    uno,
    actualizar,
    agregar,
    eliminar,
  }
}
