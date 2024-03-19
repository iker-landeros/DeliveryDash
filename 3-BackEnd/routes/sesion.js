const express = require('express')
const router = express.Router()
const { getSesion, insertSesion } = require('../controllers/sesion.controller')

router.get('/sesion', getSesion)
router.post('/sesion', insertSesion)

module.exports = router