const express = require('express')
const router = express.Router()
const { getObtainedStars, insertNivelCompletado } = require('../controllers/alumnos_niveles.controller')

router.post('/alumnos_niveles/stars', getObtainedStars)
router.post('/alumnos_niveles/nivel', insertNivelCompletado)

module.exports = router