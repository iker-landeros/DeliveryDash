const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getNiveles, getNivel, insertNivel } = require('../controllers/niveles.controller')

router.get('/niveles', middleware, getNiveles)
router.get('/niveles/:id', middleware, getNivel)

router.post('/niveles', middleware, insertNivel)

module.exports = router