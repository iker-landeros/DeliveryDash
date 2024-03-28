const express = require('express')
const router = express.Router()
const { getUsuarios, getMostPlayedUsuario, getMostPlayedAll, getTotalUsers, insertUsuario } = require('../controllers/usuario.controller')

router.get('/usuario', getUsuarios)
router.get('/usuario/most', getMostPlayedUsuario)
router.get('/usuario/most/all', getMostPlayedAll)
router.get('/usuario/total', getTotalUsers)
router.post('/usuario', insertUsuario)

module.exports = router