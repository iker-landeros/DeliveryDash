const express = require('express')
const router = express.Router()
const { getUsuarios, insertUsuario } = require('../controllers/usuario.controller')

router.get('/usuario', getUsuarios)
router.post('/usuario', insertUsuario)

module.exports = router