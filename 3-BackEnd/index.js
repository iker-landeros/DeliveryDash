const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()

const alumnos = require('./routes/alumnos')
const profesores = require('./routes/profesores')
const niveles = require('./routes/niveles')
const nivelescompletados = require('./routes/nivelescompletados')
const cursos = require('./routes/cursos')
const inscripciones = require('./routes/inscripciones')
const login = require('./routes/login')
const aulify = require('./routes/aulify')

const port = process.env.PORT || 3000

app.use(cors())
app.use(multer().array())
app.use(express.json())

app.use('/', alumnos)
app.use('/', profesores)
app.use('/', niveles)
app.use('/', nivelescompletados)
app.use('/', cursos)
app.use('/', inscripciones)
app.use('/', login)
app.use('/', aulify)


app.listen(port, () => {
    console.log(`Conectado desde el puerto ${port}`)
})