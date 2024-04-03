const express = require('express')
const router = express.Router()
const middleware = require('../middleware/jwt.middleware')
const { getAlumnos, getLeaders, getTotalAlumnos, getMostStars, getMostTime, getTotalTimeAlumno, getTotalStarsAlumno, insertAlumno } = require('../controllers/alumnos.controller')

router.get('/alumnos', middleware, getAlumnos)
router.get('/alumnos/leaders', middleware, getLeaders)
router.get('/alumnos/total', middleware, getTotalAlumnos)
router.get('/alumnos/most/stars', middleware, getMostStars)
router.get('/alumnos/most/time', middleware, getMostTime)

router.post('/alumnos/total/stars', middleware, getTotalStarsAlumno)
router.post('/alumnos/total/time', middleware, getTotalTimeAlumno)
router.post('/alumnos', middleware, insertAlumno)

module.exports = router