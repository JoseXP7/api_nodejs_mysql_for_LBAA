const TABLA = 'guias'

module.exports = function (dbInyectada) {
  let db = dbInyectada

  if (!db) {
    db = require('../../db/mysql')
  }

  function todos() {
    return db.todos(TABLA)
  }

  function uno(id_curso) {
    return db.unoCurso(TABLA, id_curso)
    /*uso del query ya que en mysql.js la consulta de uno la 
    manda como id, y se necesita mandar como id_curso*/
    //ya no mas uso del query, no busca bien en el front
  }

  function seccionJoin(id_curso) {
    return db.guiasSeccion(id_curso)
  }

  async function actualizar(body) {
    return db.actualizarCurso(TABLA, body)
  }

  async function agregar(body) {
    return db.agregar(TABLA, body)
  }

  function eliminar(id) {
    return db.eliminarCurso(TABLA, id)
  }

  return {
    seccionJoin,
    todos,
    uno,
    actualizar,
    agregar,
    eliminar,
  }
}
