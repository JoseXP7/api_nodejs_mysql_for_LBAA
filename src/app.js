const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const cors = require('cors')
const helmet = require('helmet')

const estudiantes = require('./modules/estudiantes/rutas')
const docentes = require('./modules/docentes/rutas')
const guias = require('./modules/guias/rutas')
const obreros = require('./modules/obreros/rutas')
const administrativos = require('./modules/administrativos/rutas')
const vigilantes = require('./modules/vigilantes/rutas')
const cocineros = require('./modules/cocineros/rutas')
const usuarios = require('./modules/usuarios/rutas')
const auth = require('./modules/auth/rutas')
const cursos = require('./modules/curso/rutas')
const cursos_estudiantes = require('./modules/curso_estudiante/rutas')
const proyectos = require('./modules/proyectos/rutas')
const error = require('./red/errors')

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.disable('etag')

//Configuracion
app.set('port', config.app.port)

//Rutas
app.use('/api/estudiantes', estudiantes)
app.use('/api/docentes', docentes)
app.use('/api/guias', guias)
app.use('/api/obreros', obreros)
app.use('/api/administrativos', administrativos)
app.use('/api/vigilantes', vigilantes)
app.use('/api/cocineros', cocineros)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use('/api/cursos', cursos)
app.use('/api/cursos_estudiantes', cursos_estudiantes)
app.use('/api/proyectos', proyectos)
app.use(error)

module.exports = app
