const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()

const alumnos = require('./routes/alumnos')
const profesores = require('./routes/profesores')
const sesiones = require('./routes/sesiones')
const niveles = require('./routes/niveles')

const port = process.env.PORT || 3000

app.use(cors())
app.use(multer().array())
app.use(express.json())

app.use('/', alumnos)
app.use('/', profesores)
app.use('/', sesiones)
app.use('/', niveles)

app.listen(port, () => {
    console.log(`Conectado desde el puerto ${port}`)
})