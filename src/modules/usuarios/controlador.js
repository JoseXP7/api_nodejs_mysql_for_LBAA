const TABLA = 'usuarios'
const auth = require('../auth')

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
  }

  async function actualizar(body) {
    const usuario = {
      id: body.id,
      nombre: body.nombre,
      activo: body.activo,
    }

    const respuesta = await db.actualizar(TABLA, usuario)

    let respuesta2 = ''

    if (body.usuario || body.password || body.rol) {
      respuesta2 = await auth.actualizar({
        id: body.id,
        usuario: body.usuario,
        password: body.password,
        rol: body.rol,
      })
    }

    return respuesta2
  }

  async function agregar(body) {
    const usuario = {
      nombre: body.nombre,
      activo: body.activo,
    }

    const respuesta = await db.agregar(TABLA, usuario)

    let respuesta2 = ''

    if (body.usuario || body.password || body.rol) {
      respuesta2 = await auth.agregar({
        usuario: body.usuario,
        password: body.password,
        rol: body.rol,
      })
    }

    return respuesta2
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
