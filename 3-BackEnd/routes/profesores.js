const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getProfesores, insertProfesor, deleteProfesores } = require('../controllers/profesores.controller')

router.get('/profesores', middleware, getProfesores)

router.post('/profesores',middleware, insertProfesor)
router.post('/profesores/delete', middleware, deleteProfesores)

module.exports = router