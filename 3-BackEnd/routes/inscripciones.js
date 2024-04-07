const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getInscripciones, insertInscripcion } = require('../controllers/inscripciones.controller')

router.get('/inscripciones', middleware, getInscripciones)

router.post('/inscripciones', middleware, insertInscripcion)

module.exports = router