const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()

const alumnos = require('./routes/alumnos')
const profesores = require('./routes/profesores')
const sesiones = require('./routes/sesiones')
const niveles = require('./routes/niveles')
const alumnos_niveles = require('./routes/alumnos_niveles')

const port = process.env.PORT || 3000

app.use(
    cors({
        origin: '*',
    })
)
app.use(multer().array())
app.use(express.json())

app.use('/', alumnos)
app.use('/', profesores)
app.use('/', sesiones)
app.use('/', niveles)
app.use('/', alumnos_niveles)

app.listen(port, () => {
    console.log(`Conectado desde el puerto ${port}`)
})