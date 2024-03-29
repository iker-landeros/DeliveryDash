const pool = require('../helpers/mysql-config')

const getSesion = (req, res) => {
    const sql = `SELECT * FROM Sesion`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertSesion = (req, res) => {
    const { userID, date, sesionTime } = req.body
    const sql = `INSERT INTO Sesion(userID, date, sessionTime)
                 VALUES(?, ?, ?)`

    pool.query(sql, [userID, date, sesionTime], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

module.exports = { getSesion, insertSesion }