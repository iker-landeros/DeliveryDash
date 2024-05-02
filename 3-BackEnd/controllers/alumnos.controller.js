const pool = require('../helpers/mysql-config')

// Info de todos los alumnos inscritos a aulify
const getAlumnosSubscribed = (req, res) => {
    const sql = `SELECT * FROM Alumnos WHERE subscribed = 1`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Info de los alumnos dependiendo del curso
const getAlumnosFromCurso = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT DISTINCT A.*
                 FROM Alumnos A
                 JOIN Inscripciones I ON A.alumnoID = I.alumnoID
                 JOIN Cursos C ON I.cursoID = C.cursoID
                 WHERE C.cursoID = ?`

    pool.query(sql, [cursoID], (err, results, fields) => {
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

const getAlumnosByMail = (req, res) => {
    const { mail } = req.body
    const sql = `SELECT * FROM Alumnos WHERE mail = ?`

    pool.query(sql, [mail], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de alumnos inscritos a aulify ordenado por estrellas
const getMostStarsSubscribed = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT
                     A.nickname,
                     SUM(MaxStars.obtainedStars) AS obtainedStars
                 FROM Alumnos A
                 JOIN (
                 SELECT 
                     alumnoID,
                     nivelID,
                     dateFinal,
                     MAX(obtainedStars) AS obtainedStars
                 FROM NivelesCompletados
                 GROUP BY alumnoID, nivelID
                 ) AS MaxStars ON A.alumnoID = MaxStars.alumnoID
                 JOIN Inscripciones I ON MaxStars.alumnoID = I.alumnoID
                 WHERE I.cursoID = ?
                 GROUP BY A.alumnoID
                 ORDER BY obtainedStars DESC`

    pool.query(sql, [cursoID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de todos los alumnos ordenado por estrellas
const getMostStarsAll = (req, res) => {
    const sql = `SELECT
                     A.nickname,
                     SUM(MaxStars.obtainedStars) AS obtainedStars
                 FROM Alumnos A
                 JOIN (
                 SELECT 
                     alumnoID,
                     nivelID,
                     dateFinal,
                     MAX(obtainedStars) AS obtainedStars
                 FROM NivelesCompletados
                 GROUP BY alumnoID, nivelID
                 ) AS MaxStars ON A.alumnoID = MaxStars.alumnoID
                 GROUP BY A.alumnoID
                 ORDER BY obtainedStars DESC`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Obtener leaderboard de alumnos inscritos a aulify ordenado por timepo jugado
const getMostTimeSubscribed = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT A.nickname,
                SUM(TIMESTAMPDIFF(SECOND, NC.dateInicio, NC.dateFinal)) AS tiempoTotal
                FROM Alumnos A
                JOIN Inscripciones I ON A.alumnoID = I.alumnoID
                JOIN NivelesCompletados NC ON A.alumnoID = NC.alumnoID
                WHERE I.cursoID = ?
                GROUP BY A.alumnoID, A.nickname
                ORDER BY SUM(TIMESTAMPDIFF(SECOND, NC.dateInicio, NC.dateFinal)) DESC
                LIMIT 3`

    pool.query(sql, [cursoID], (err, results, fields) => {
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
                     SUM(MaxStars.obtainedStars) AS total_stars
                 FROM Alumnos A
                 JOIN (
                 SELECT 
                     alumnoID,
                     nivelID,
                     dateFinal,
                     MAX(obtainedStars) AS obtainedStars
                 FROM NivelesCompletados
                 GROUP BY alumnoID, nivelID
                 ) AS MaxStars ON A.alumnoID = MaxStars.alumnoID
                 WHERE mail = ?
                 GROUP BY A.alumnoID
                 ORDER BY total_stars DESC`

    pool.query(sql, [mail], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertAlumno = (req, res) => {
    const {mail, nickname, subscribed} = req.body
    const sql = `INSERT INTO Alumnos(mail, nickname, subscribed)
                 VALUES(?, ?, ?)`

    pool.query(sql, [mail, nickname, subscribed], (err, results, fields) => {
        if (err) {
            if (err.errno == 1644) res.json({ status: 404, mensaje: err.sqlMessage})    
            else res.json(err)
        }
        else res.json({ status: 200, mensaje: 'Alumno registrado correctamente' })
    })
}

const deleteAlumnos = (req, res) => {
    const { ids } = req.body
    const sql = `CALL deleteAlumnos(?)`

    pool.query(sql, [ids], (err, results, fields) => {
        if (err) res.json(err)
        res.json({ status: 200, mensaje: `Alumnos ${ids} borrados correctamente` })
    })
}

const getTotalAlumnosByGroup = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT COUNT(a.alumnoID)  as alumnoCount
                    FROM Alumnos as a
                    INNER JOIN Inscripciones as I
                    ON a.alumnoID = I.alumnoID
                    WHERE I.cursoID = ?
                    GROUP BY cursoID`

    pool.query(sql, [cursoID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getAlumnosByCourse = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT c.nombre,
                a.alumnoID, 
                a.mail,
                a.nickname,
                a.subscribed,
                nc.nivelID,
                nc.obtainedStars,
                nc.dateInicio,
                nc.dateFinal
            FROM Alumnos as a
            INNER JOIN NivelesCompletados as nc
            ON a.alumnoID = nc.alumnoID
            INNER JOIN Inscripciones AS i
            ON a.alumnoID = i.cursoID
            INNER JOIN Cursos AS c
            ON i.cursoID = c.cursoID
            WHERE i.cursoID = ?`

    pool.query(sql, [cursoID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}


module.exports = { getAlumnosSubscribed,
                   getAlumnos,
                   getAlumnosFromCurso,
                   getAlumnosByMail,
                   getMostStarsSubscribed,
                   getMostStarsAll,
                   getMostTimeSubscribed,
                   getMostTimeAll,
                   getTotalAlumnosSubscribed,
                   getTotalAlumnosAll,
                   getTotalStarsAlumno,
                   insertAlumno,
                   deleteAlumnos,
                   getTotalAlumnosByGroup,
                   getAlumnosByCourse }