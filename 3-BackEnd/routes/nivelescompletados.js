const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getNivelesCompletados, getNivelesCompletadosByAlumno, insertNivelCompletado } = require('../controllers/nivelescompletados.controller')

router.get('/nivelescompletados', getNivelesCompletados)

router.post('/nivelescompletados/byAlumno', getNivelesCompletadosByAlumno)
router.post('/nivelescompletados', insertNivelCompletado)

module.exports = router
