const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getNivelesCompletados, getNivelesCompletadosByAlumno, insertNivelCompletado, getTotalStars, getHorasTotalPorMes, getTotalNivelesCompletados, getPromedioTiempoNivel, getTiempoTotal, getUsuarioConectadosDia } = require('../controllers/nivelescompletados.controller')

router.get('/nivelescompletados', getNivelesCompletados)
router.get('/nivelescompletados/stars', getTotalStars)
router.get('/nivelescompletados/horas/mes', getHorasTotalPorMes)
router.get('/nivelescompletados/total', getTotalNivelesCompletados)
router.get('/nivelescompletados/total/nivel', getPromedioTiempoNivel)
router.get('/nivelescompletados/total/tiempo', getTiempoTotal)
router.get('/nivelescompletados/total/tiempo/dia', getUsuarioConectadosDia)

router.post('/nivelescompletados/byAlumno', getNivelesCompletadosByAlumno)
router.post('/nivelescompletados', insertNivelCompletado)

module.exports = router
