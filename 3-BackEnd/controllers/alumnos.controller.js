const pool = require('../helpers/mysql-config')

// Todos los alumnos
const getAlumnos = (req, res) => {
    const sql = `SELECT * FROM Alumnos`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard ordenado por estrellas ganadas y tiempo jugado
const getLeaders = (req, res) => {
    const sql = `SELECT 
                    A.nickname,
                    TS.totalTiempoSesion,
                    TE.totalEstrellasObtenidas
                 FROM Alumnos A
                 JOIN (
                    SELECT alumnoID, SUM(sesionTime) AS totalTiempoSesion
                    FROM Sesiones
                    GROUP BY alumnoID
                 ) AS TS ON A.alumnoID = TS.alumnoID
                 JOIN (
                    SELECT alumnoID, SUM(obtainedStars) AS totalEstrellasObtenidas
                    FROM Alumnos_Niveles
                    GROUP BY alumnoID
                 ) AS TE ON A.alumnoID = TE.alumnoID
                 ORDER BY TE.totalEstrellasObtenidas DESC, TS.totalTiempoSesion DESC;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Total de alumnos registrados
const getTotalAlumnos = (req, res) => {
    const sql = `SELECT COUNT(alumnoID) AS alumnoCount FROM Alumnos WHERE subscribed = 1`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Leaderboard de estrellas obtenidas
const getMostStars = (req, res) => {
    const sql = `SELECT 
                    Alumnos.nickname AS nickname,
                    SUM(Alumnos_Niveles.obtainedStars) AS EstrellasObtenidas
                 FROM Alumnos
                 JOIN Alumnos_Niveles ON Alumnos.alumnoID = Alumnos_Niveles.alumnoID
                 GROUP BY Alumnos.nickname
                 ORDER BY EstrellasObtenidas DESC;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Leaderboard de tiempo jugado
const getMostTime = (req, res) => {
    const sql = `SELECT 
                    Alumnos.nickname AS nickname,
                    SUM(Sesiones.sesionTime) AS TiempoTotalJugado
                 FROM Alumnos
                 JOIN Sesiones ON Alumnos.alumnoID = Sesiones.alumnoID
                 GROUP BY Alumnos.nickname
                 ORDER BY TiempoTotalJugado DESC;`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Tiempo total jugado de cada alumno
const getTotalTimeAlumno = (req, res) => {
    const { mail } = req.body
    const sql = `SELECT 
                    Alumnos.nickname,
                    Alumnos.mail,
                    SUM(Sesiones.sesionTime) AS totalTiempoJugado
                 FROM Alumnos
                 JOIN Sesiones ON Alumnos.alumnoID = Sesiones.alumnoID
                 WHERE Alumnos.mail = ?
                 GROUP BY Alumnos.mail;`
    
    pool.query(sql, [mail], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Estrellas totales obtenidas de cada alumno
const getTotalStarsAlumno = (req, res) => {
    const { mail } = req.body
    console.log(mail)
    const sql = `SELECT 
                    Alumnos.nickname,
                    Alumnos.mail,
                    SUM(Alumnos_Niveles.obtainedStars) AS totalStars
                 FROM Alumnos
                 JOIN Alumnos_Niveles ON Alumnos.alumnoID = Alumnos_Niveles.alumnoID
                 WHERE Alumnos.mail = ?
                 GROUP BY Alumnos.mail;`

    pool.query(sql, [mail], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertAlumno = (req, res) => {
    const {mail, nickname, subscribed} = req.body
    const sql = `INSERT INTO Alumnos(mail, nickname, subscribed)
                 VALUES(?, ?, ?)`

    let result = {}
    pool.query(sql, [mail, nickname, subscribed], (err, results, fields) => {
        if (err) res.json(err)
        else {
            result = { status: 200, mensaje: 'Alumno agregado correctamente' }
            res.json(result)
        }
    })
}

module.exports = { getAlumnos, 
                   getLeaders, 
                   getTotalAlumnos, 
                   getMostStars, 
                   getMostTime, 
                   getTotalTimeAlumno,
                   getTotalStarsAlumno, 
                   insertAlumno }