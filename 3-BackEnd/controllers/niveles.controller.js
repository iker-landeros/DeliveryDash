const pool = require('../helpers/mysql-config')

// Todos los niveles
const getNiveles = (req, res) => {
    const sql = `SELECT * FROM Niveles;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Nivel por su id
const getNivel = (req, res) => {
    const nivelID = req.params.id
    const sql = `SELECT * FROM Niveles WHERE nivelID = ?`

    pool.query(sql, [nivelID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertNivel = (req, res) => {
    const { maxStars } = req.body
    const sql = `INSERT Niveles(maxStars) VALUES(?)`

    let result = {}
    pool.query(sql, [maxStars], (err, results, fields) => {
        if (err) res.json(err)
        else {
            result = { status: 200, mensaje: 'Nivel agregado correctamente' }
            res.json(result)
        }
    })
}

module.exports = { getNiveles, getNivel, insertNivel}