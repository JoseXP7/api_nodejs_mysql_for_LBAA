const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let conexion

function conMysql() {
  conexion = mysql.createConnection(dbconfig)

  conexion.connect((err) => {
    if (err) {
      console.log('[DB Error]', err)
      setTimeout(conMysql, 200)
    } else {
      console.log('DB Conectada')
    }
  })

  conexion.on('Error', (err) => {
    console.log('[DB Error]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      conMysql()
    } else {
      throw err
    }
  })
}

conMysql()

//Usuarios, estudiantes, auth

function todos(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      return error ? reject(error) : resolve(result)
    })
  })
}

function uno(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE id = ${id}`,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function unoCedula(tabla, cedula) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE cedula = ${cedula}`,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function actualizar(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${tabla} SET ? WHERE id = ?`,
      [data, data.id],
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function agregar(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
      return error ? reject(error) : resolve(result)
    })
  })
}

function eliminar(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE id = ?`,
      data.id,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE ?`,
      consulta,
      (error, result) => {
        return error ? reject(error) : resolve(result[0]) //result[0] para traer un solo registro
      }
    )
  })
}

//cursos

function unoCurso(tabla, id_curso) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE id_curso = ${id_curso}`,
      (error, result) => {
        return error ? reject(error) : resolve(result[0])
      }
    )
  })
}

function actualizarCurso(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${tabla} SET ? WHERE id_curso = ?`,
      [data, data.id_curso],
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function eliminarCurso(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE id_curso = ?`,
      data.id_curso,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

//curso_estudiante

function unoCursoEstudiante(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE id_estudiante = ${id}`,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function actualizarCursoEstudiante(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${tabla} SET ? WHERE id_estudiante = ?`,
      [data, data.id_estudiante],
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

function eliminarCursoEstudiante(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE id_estudiante = ?`,
      data.id_estudiante,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

//traer una seccion con estudiantes
function seccionEstudiantes(id_curso) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT e.id, e.cedula, e.nombres, e.apellidos, c.nombre as "seccion" FROM estudiante e JOIN curso_estudiante ce ON e.id = ce.id_estudiante JOIN curso c ON c.id_curso = ce.id_curso WHERE c.id_curso = ${id_curso}`,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

//traer guias de una seccion
function guiasSeccion(id_curso) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT g.id, g.url, g.nombre, c.nombre as "seccion" FROM guias g JOIN curso c ON g.id_seccion = c.id_curso WHERE c.id_curso = ${id_curso}`,
      (error, result) => {
        return error ? reject(error) : resolve(result)
      }
    )
  })
}

module.exports = {
  todos,
  uno,
  unoCedula,
  actualizar,
  agregar,
  eliminar,
  query,
  unoCurso,
  actualizarCurso,
  eliminarCurso,
  unoCursoEstudiante,
  actualizarCursoEstudiante,
  eliminarCursoEstudiante,
  seccionEstudiantes,
  guiasSeccion,
}
