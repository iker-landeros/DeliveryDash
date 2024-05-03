const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getInscripciones, insertInscripcion, deleteInscripciones,getUsuariosByCurso } = require('../controllers/inscripciones.controller')

router.get('/inscripciones', middleware, getInscripciones)

router.post('/inscripciones/curso', middleware, getUsuariosByCurso)
router.post('/inscripciones', middleware, insertInscripcion)
router.post('/inscripciones/delete', middleware, deleteInscripciones)

module.exports = router