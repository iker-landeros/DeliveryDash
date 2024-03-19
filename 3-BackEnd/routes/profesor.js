const express = require('express')
const router = express.Router()
const { getProfesores, insertProfesor, login } = require('../controllers/profesor.controller')
const middleware = require('../middleware/jwt.middleware')

router.get('/profesor', middleware, getProfesores)
router.post('/profesor/login', login)
router.post('/profesor', insertProfesor)

module.exports = router