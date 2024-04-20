const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getCursos, getCursosByProfesor, insertCurso, deleteCursos } = require('../controllers/cursos.controller')

router.get('/cursos', middleware, getCursos)

router.post('/cursos', middleware, insertCurso)
router.post('/cursos/byProfesor', middleware, getCursosByProfesor)
router.post('/cursos/delete', middleware, deleteCursos)

module.exports = router