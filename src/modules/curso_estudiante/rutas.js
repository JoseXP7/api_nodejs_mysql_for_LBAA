const express = require('express')

const seguridad = require('./seguridad')

const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

router.get('/', todos)
router.get('/:id_estudiante', uno)
router.post('/', seguridad(), agregar)
router.put('/', seguridad(), actualizar)
router.delete('/', seguridad(), eliminar)

async function todos(req, res, next) {
  try {
    const items = await controlador.todos()
    respuesta.success(req, res, items, 200)
  } catch (err) {
    next(err)
  }
}

async function uno(req, res, next) {
  try {
    const items = await controlador.uno(req.params.id_estudiante)
    respuesta.success(req, res, items, 200)
  } catch (err) {
    next(err)
  }
}

async function actualizar(req, res, next) {
  try {
    const items = await controlador.actualizar(req.body)
    mensaje = 'Actualizado con exito'
    respuesta.success(req, res, mensaje, 201)
  } catch (err) {
    next(err)
  }
}

async function agregar(req, res, next) {
  try {
    const items = await controlador.agregar(req.body)
    mensaje = 'Asignado con exito'
    respuesta.success(req, res, mensaje, 201)
  } catch (err) {
    next(err)
  }
}

async function eliminar(req, res, next) {
  try {
    const items = await controlador.eliminar(req.body)
    respuesta.success(req, res, 'Asignación Eliminada', 200)
  } catch (err) {
    next(err)
  }
}

module.exports = router
