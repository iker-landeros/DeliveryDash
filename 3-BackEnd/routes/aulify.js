const express = require('express')
const router = express.Router()
const { validateUser } = require('../controllers/aulify.controller')

router.post('/aulify/isAulifyUser', validateUser)

module.exports = router