const pool = require('../helpers/mysql-config')
const jwt = require('jsonwebtoken')

const getProfesores = (req, res) => {
    const sql = `SELECT * FROM Profesores`
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertProfesor = (req, res) => {
    const {mail, password, fName, lName} = req.body
    let result = {}
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
    const isValidEmail = emailRegex.test(mail)

    if (isValidEmail) {
        const sql = `CALL insertProfesor(?, ?, ?, ?)`
        pool.query(sql, [mail, password, fName, lName], (err, results, fields) => {
            if (err) res.json(err)
            if (results) {
                result = { status: 404, mensaje: 'Ya existe un profesor registrado con ese email' }
            } else {
                result = { status: 200, mensaje: 'Profesor registrado correctamente' }
            }
            res.json(result)
        })
    } else {
        result = { status: 403, mensaje: 'Email inválido' }
        res.json(result)
    }
}

const login = (req, res) => {
    const {mail, password} = req.body
    let token = ''
    let result = {}

    const sql = `SELECT COUNT(*) AS cantidad FROM Profesores
                 WHERE mail = ? AND password = SHA2(?, 224)`
    pool.query(sql, [mail, password], (err, results, fields) => {
        if (err) res.json(err)

        if (results[0].cantidad === 1) {
            token = jwt.sign({ mail: mail }, process.env.KEYPHRASE, { expiresIn: 7200 })
            result = { token: token, status:200, mensaje: 'Usuario autenticado correctamente' }
        } else {
            result = { status: 404, mensaje: 'Correo o contraseña incorrectos' }
        }
        res.json(result)
    })
}

module.exports = { getProfesores, insertProfesor, login }