const pool = require('../helpers/mysql-config')
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    const { mail, password } = req.body
    let token = ''
    let result = {}

    const sql = `CALL doLogin(?, ?)`
    pool.query(sql, [mail, password], (err, results, fields) => {
        if (err) res.json(err)

        console.log(results);
        if (results[0][0].cuenta === 1) {
            const user = results[0][0].isAdmin ? 'Admin' : 'Profesor'
            token = jwt.sign({ mail: mail, user:user }, process.env.KEYPHRASE, { expiresIn: 7200 })
            result = { token: token, status:200, mensaje: 'Usuario autenticado correctamente', isAdmin: results[0][0].isAdmin }
        } else {
            result = { status: 404, mensaje: 'Correo o contraseña incorrectos' }
        }
        res.json(result)
    })
}

module.exports = { login }