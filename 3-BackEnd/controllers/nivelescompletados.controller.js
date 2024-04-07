const pool = require('../helpers/mysql-config')
const { insertNivel } = require('./niveles.controller')

const getNivelesCompletados = (req, res) => {
    const sql = `SELECT * FROM NivelesCompletados`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getNivelesCompletadosByAlumno = (req, res) => {
    const { mail } = req.body
    const sql = `SELECT 
                     A.nickname,
                     NC.nivelID,
                     NC.obtainedStars
                 FROM Alumnos A
                 JOIN NivelesCompletados NC ON A.alumnoID = NC.alumnoID
                 JOIN (
                     SELECT nivelID, alumnoID, MAX(obtainedStars) AS maxStars
                     FROM NivelesCompletados
                     WHERE alumnoID IN (SELECT alumnoID FROM Alumnos WHERE mail = ?)
                     GROUP BY nivelID, alumnoID
                 ) AS MaxStars ON NC.nivelID = MaxStars.nivelID 
                     AND NC.alumnoID = MaxStars.alumnoID 
                     AND NC.obtainedStars = MaxStars.maxStars
                 WHERE A.mail = ?`

    pool.query(sql, [mail, mail], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertNivelCompletado = (req, res) => {
    const { nivelID, alumnoID, dateInicio, dateFinal, obtainedStars } = req.body
    const sql = `INSERT NivelesCompletados(nivelID, alumnoID, dateInicio, dateFinal, obtainedStars)
                 VALUES(?, ?, ?, ?, ?)`

    let result
    pool.query(sql, [nivelID, alumnoID, dateInicio, dateFinal, obtainedStars], (err, results, fields) => {
        if (err) res.json(err)
        result = { status: 200, mensaje: 'Nivel completado insertado correctamente'}
        res.json(result)
    })
}

module.exports = { getNivelesCompletados, getNivelesCompletadosByAlumno, insertNivelCompletado }