const express = require('express')
const router = express.Router()
const { getProgress, insertProgress } = require('../controllers/progress.controller')

router.get('/progress', getProgress)
router.post('/progress', insertProgress)

module.exports = router