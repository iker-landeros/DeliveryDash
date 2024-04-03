const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getProfesores, insertProfesor, login } = require('../controllers/profesores.controller')

router.get('/profesor', middleware, getProfesores)
router.post('/profesor/login', login)
router.post('/profesor',middleware, insertProfesor)

module.exports = router