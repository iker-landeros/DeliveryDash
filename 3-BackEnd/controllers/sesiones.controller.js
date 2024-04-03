const pool = require('../helpers/mysql-config')

// Todas las sesiones
const getSesiones = (req, res) => {
    const sql = `SELECT * FROM Sesiones`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Total de horas jugadas entre todos los jugadores
const getTotalTime = (req, res) => {
    const sql = `SELECT SUM(sesionTime) AS totalTime FROM Sesiones`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Suma del tiempo jugado de cada jugador
const getTimeAll = (req, res) => {
    const sql = `SELECT Alumnos.nickname, SUM(Sesiones.sesionTime) AS totalTiempoSesion
                 FROM Sesiones
                 JOIN Alumnos ON Sesiones.alumnoID = Alumnos.alumnoID
                 GROUP BY Sesiones.alumnoID
                 ORDER BY totalTiempoSesion DESC;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertSesion = (req, res) => {
    const { alumnoID, date, sesionTime } = req.body
    const sql = `INSERT INTO Sesiones(alumnoID, date, sesionTime)
                 VALUES(?, ?, ?)`

    let result = {}
    pool.query(sql, [alumnoID, date, sesionTime], (err, results, fields) => {
        if (err) res.json(err)
        else {
            result = { status: 200, mensaje: 'Sesion agregada correctamente' }
            res.json(result)
        }
    })
}

module.exports = { getSesiones, getTotalTime, getTimeAll, insertSesion }