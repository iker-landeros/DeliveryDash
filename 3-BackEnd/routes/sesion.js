const express = require('express')
const router = express.Router()
const { getSesion, getTotalTimeAll, getTotalTimeUser, insertSesion } = require('../controllers/sesion.controller')

router.get('/sesion', getSesion)
router.get('/sesion/total/all', getTotalTimeAll)
router.post('/sesion', insertSesion)
router.post('/sesion/total', getTotalTimeUser)

module.exports = router