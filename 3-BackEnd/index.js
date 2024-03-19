const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()

const usuario = require('./routes/usuario')
const profesor = require('./routes/profesor')
const progress = require('./routes/progress')
const sesion = require('./routes/sesion')

const port = process.env.PORT || 3000

app.use(cors())
app.use(multer().array())
app.use(express.json())

app.use('/', usuario)
app.use('/', profesor)
app.use('/', progress)
app.use('/', sesion)

app.listen(port, () => {
    console.log(`Conectado desde el puerto ${port}`)
})