const TABLA = 'proyectos'

module.exports = function (dbInyectada) {
  let db = dbInyectada

  if (!db) {
    db = require('../../db/mysql')
  }

  function todos() {
    return db.todos(TABLA)
  }

  function uno(id) {
    return db.uno(TABLA, id)
    /*uso del query ya que en mysql.js la consulta de uno la 
    manda como id, y se necesita mandar como id_curso*/
    //ya no mas uso del query, no busca bien en el front
  }

  async function actualizar(body) {
    return db.actualizar(TABLA, body)
  }

  async function agregar(body) {
    return db.agregar(TABLA, body)
  }

  function eliminar(id) {
    return db.eliminar(TABLA, id)
  }

  return {
    todos,
    uno,
    actualizar,
    agregar,
    eliminar,
  }
}
