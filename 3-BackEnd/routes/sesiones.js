const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getSesiones, getTimeAll, getTotalTime, insertSesion } = require('../controllers/sesiones.controller')

router.get('/sesiones', middleware, getSesiones)
router.get('/sesiones/time', middleware, getTimeAll)
router.get('/sesiones/time/total', middleware, getTotalTime)

router.post('/sesiones', middleware, insertSesion)

module.exports = router