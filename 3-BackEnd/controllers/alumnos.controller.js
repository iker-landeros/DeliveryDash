const pool = require('../helpers/mysql-config')

// Info de todos los alumnos inscritos a aulify
const getAlumnosSubscribed = (req, res) => {
    const sql = `SELECT * FROM Alumnos WHERE subscribed = 1`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Info de todos los alumnos
const getAlumnos = (req, res) => {
    const sql = `SELECT * FROM Alumnos`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de alumnos inscritos a aulify ordenado por estrellas
const getMostStarsSubscribed = (req, res) => {
    const { cursoID, anio, mes } = req.body
    const sql = `SELECT 
                 	A.nickname,
                     SUM(NC.obtainedStars) AS estrellasObtenidas
                 FROM Alumnos A
                 JOIN Inscripciones I ON A.alumnoID = I.alumnoID
                 JOIN (
                 	SELECT nivelID, alumnoID, MAX(obtainedStars) AS maxStars
                     FROM NivelesCompletados
                     GROUP BY nivelID, alumnoID
                 ) AS MaxStars ON A.alumnoID = MaxStars.alumnoID
                 JOIN NivelesCompletados NC ON MaxStars.nivelID = NC.nivelID AND MaxStars.alumnoID = NC.alumnoID AND MaxStars.maxStars = NC.obtainedStars
                 WHERE I.cursoID = ?
                 AND YEAR(NC.dateInicio) = ?
                 AND MONTH(NC.dateInicio) = ?
                 GROUP BY A.alumnoID
                 ORDER BY estrellasObtenidas DESC`

    pool.query(sql, [cursoID, anio, mes], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de todos los alumnos ordenado por estrellas
const getMostStarsAll = (req, res) => {
    const sql = `SELECT 
                 	 A.nickname,
                     SUM(NC.obtainedStars) AS estrellasObtenidas
                 FROM Alumnos A
                 JOIN (
                 	SELECT nivelID, alumnoID, MAX(obtainedStars) AS maxStars
                     FROM NivelesCompletados
                     GROUP BY nivelID, alumnoID
                 ) AS MaxStars ON A.alumnoID = MaxStars.alumnoID
                 JOIN NivelesCompletados NC ON MaxStars.nivelID = NC.nivelID AND MaxStars.alumnoID = NC.alumnoID AND MaxStars.maxStars = NC.obtainedStars
                 GROUP BY A.alumnoID
                 ORDER BY estrellasObtenidas DESC`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de alumnos inscritos a aulify ordenado por timepo jugado
const getMostTimeSubscribed = (req, res) => {
    const { cursoID, anio, mes } = req.body
    const sql = `SELECT A.nickname,
                     SUM(TIMESTAMPDIFF(SECOND, NC.dateInicio, NC.dateFinal)) AS tiempoTotal
                 FROM Alumnos A
                 JOIN Inscripciones I ON A.alumnoID = I.alumnoID
                 JOIN Cursos C ON I.cursoID = C.cursoID
                 JOIN NivelesCompletados NC ON A.alumnoID = NC.alumnoID
                 WHERE C.cursoID = ?
                 AND YEAR(NC.dateInicio) = ?
                 AND MONTH(NC.dateInicio) = ?
                 GROUP BY A.alumnoID, A.nickname`

    pool.query(sql, [cursoID, anio, mes], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de todos los alumnos ordenado por timepo jugado
const getMostTimeAll = (req, res) => {
    const sql = `SELECT A.nickname,
                     SUM(TIMESTAMPDIFF(SECOND, NC.dateInicio, NC.dateFinal)) AS tiempoTotal
                 FROM Alumnos A
                 JOIN NivelesCompletados NC ON A.alumnoID = NC.alumnoID
                 GROUP BY A.alumnoID, A.nickname`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Total de alumnos inscritos a aulify
const getTotalAlumnosSubscribed = (req, res) => {
    const sql = `SELECT COUNT(alumnoID) AS alumnoCount FROM Alumnos WHERE subscribed = 1`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Total de alumnos
const getTotalAlumnosAll = (req, res) => {
    const sql = `SELECT COUNT(alumnoID) AS alumnoCount FROM Alumnos`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Estrellas totales obtenidas de cada alumno
const getTotalStarsAlumno = (req, res) => {
    const { mail } = req.body
    console.log(mail)
    const sql = `SELECT 
                     A.nickname,
                     SUM(NC.obtainedStars) AS estrellasObtenidas
                 FROM Alumnos A
                 JOIN (
                     SELECT nivelID, alumnoID, MAX(obtainedStars) AS maxStars
                     FROM NivelesCompletados
                     GROUP BY nivelID, alumnoID
                 ) AS MaxStars ON A.alumnoID = MaxStars.alumnoID
                 JOIN NivelesCompletados NC ON MaxStars.nivelID = NC.nivelID AND MaxStars.alumnoID = NC.alumnoID AND MaxStars.maxStars = NC.obtainedStars
                 WHERE A.mail = ? 
                 GROUP BY A.alumnoID
                 ORDER BY estrellasObtenidas DESC`

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

module.exports = { getAlumnosSubscribed,
                   getAlumnos,
                   getMostStarsSubscribed,
                   getMostStarsAll,
                   getMostTimeSubscribed,
                   getMostTimeAll,
                   getTotalAlumnosSubscribed,
                   getTotalAlumnosAll,
                   getTotalStarsAlumno,
                   insertAlumno }