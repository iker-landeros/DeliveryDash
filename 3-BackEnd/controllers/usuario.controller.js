const pool = require('../helpers/mysql-config')

const getUsuarios = (req, res) => {
    const sql = `SELECT * FROM Usuario`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertUsuario = (req, res) => {
    const {mail, fName, lName} = req.body
    const sql = `INSERT INTO Usuario(mail, fName, lName)
                 VALUES(?, ?, ?)`
    pool.query(sql, [mail, fName, lName], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

module.exports = { getUsuarios, insertUsuario }