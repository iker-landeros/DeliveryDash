const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getProfesores, insertProfesor, login } = require('../controllers/profesores.controller')

router.get('/profesores', middleware, getProfesores)

router.post('/profesores/login', login)
router.post('/profesores',middleware, insertProfesor)

module.exports = router