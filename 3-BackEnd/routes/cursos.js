const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getCursos, insertCurso, deleteCurso } = require('../controllers/cursos.controller')

router.get('/cursos', middleware, getCursos)

router.post('/cursos', middleware, insertCurso)
router.post('/cursos/delete', middleware, deleteCurso)

module.exports = router