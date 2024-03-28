const pool = require('../helpers/mysql-config')

const getUsuarios = (req, res) => {
    const sql = `SELECT * FROM Usuario`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getMostPlayedUsuario = (req, res) => {
    const sql = `SELECT Usuario.fName, Sesion.sesionTime 
                 FROM Usuario 
                 INNER JOIN Sesion ON Usuario.userID = Sesion.userID
                 WHERE Sesion.sesionTime = (SELECT MAX(sesionTime) FROM Sesion AS max)
                 ORDER BY Sesion.date;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getMostPlayedAll = (req, res) => {
    const sql = `SELECT Usuario.fName, Sesion.sesionTime 
                 FROM Usuario INNER JOIN Sesion
                 ON Usuario.userID = Sesion.userID
                 ORDER BY Sesion.sesionTime DESC;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getTotalUsers = (req, res) => {
    const sql = `SELECT COUNT(userID) AS userCount FROM Usuario;`

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



module.exports = { getUsuarios, getMostPlayedUsuario, getMostPlayedAll, getTotalUsers, insertUsuario }