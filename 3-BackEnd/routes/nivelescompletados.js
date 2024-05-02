const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getNivelesCompletados, 
    getNivelesCompletadosByAlumno, 
    insertNivelCompletado, 
    getTotalStars, 
    getHorasTotalPorMes, 
    getTotalNivelesCompletados, 
    getPromedioTiempoNivel, 
    getTiempoTotal, 
    getUsuarioConectadosDia,
    getPromedioTiempoNivelByCourse,
    getEstrellasTotalesByCourse,
    getTotalNivelesCompletadosByCourse,
    getMinutosTotalesByCourse } = require('../controllers/nivelescompletados.controller')

router.get('/nivelescompletados', getNivelesCompletados)
router.get('/nivelescompletados/stars', getTotalStars)
router.get('/nivelescompletados/total', getTotalNivelesCompletados)
router.get('/nivelescompletados/total/nivel', getPromedioTiempoNivel)
router.get('/nivelescompletados/total/tiempo', getTiempoTotal)

router.post('/nivelescompletados/horas/mes', getHorasTotalPorMes)
router.post('/nivelescompletados/total/tiempo/dia', getUsuarioConectadosDia)
router.post('/nivelescompletados/byAlumno', getNivelesCompletadosByAlumno)
router.post('/nivelescompletados/stars/total/curso', getEstrellasTotalesByCourse)
router.post('/nivelescompletados/promedio/nivel/curso', getPromedioTiempoNivelByCourse)
router.post('/nivelescompletados/total/tiempo/curso', getMinutosTotalesByCourse)
router.post('/nivelescompletados/total/nivel/curso', getTotalNivelesCompletadosByCourse)
router.post('/nivelescompletados', insertNivelCompletado)

module.exports = router
