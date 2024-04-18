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
    const { nivelID, mail, dateInicio, dateFinal, obtainedStars } = req.body
    const sql = `CALL insertNivelCompletado(?, ?, ?, ?, ?)`

    let result
    pool.query(sql, [nivelID, mail, dateInicio, dateFinal, obtainedStars], (err, results, fields) => {
        if (err) res.json(err)
        result = { status: 200, mensaje: 'Nivel completado insertado correctamente' }
        res.json(result)
    })
}
const getTotalStars = (req, res) => {
    const sql = `SELECT sum(obtainedStars) AS estrellasTotales
                FROM NivelesCompletados`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getHorasTotalPorMes = (req, res) => {
    const sql = `SELECT SUM(TIMESTAMPDIFF(MINUTE, dateInicio, dateFinal)) AS minutos,
                    MONTHNAME(dateInicio) as mes
                FROM NivelesCompletados`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getTotalNivelesCompletados = (req, res) => {
    const sql = `SELECT COUNT(*) as NivelesCompletados
                FROM NivelesCompletados`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getPromedioTiempoNivel = (req, res) => {
    const sql = `SELECT nivelID as nivel,
                    ROUND(AVG((TIMESTAMPDIFF(MINUTE, dateInicio, dateFinal))),2) AS promedio
                FROM NivelesCompletados
                GROUP BY nivelID`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getTiempoTotal = (req, res) => {
    const sql = `SELECT SUM((TIMESTAMPDIFF(MINUTE, dateInicio, dateFinal))) as minutos
                FROM NivelesCompletados`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getUsuarioConectadosDia = (req, res) => {
    const sql = `SELECT DATE_FORMAT(dateInicio,'%Y-%m-%d') AS fecha,
                    COUNT(DISTINCT alumnoID) as usuarios
                FROM NivelesCompletados
                WHERE alumnoID>0
                GROUP BY DAY(dateInicio)`

    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}
module.exports = { getNivelesCompletados, getNivelesCompletadosByAlumno, insertNivelCompletado, getTotalStars, getHorasTotalPorMes, getTotalNivelesCompletados, getPromedioTiempoNivel, getTiempoTotal, getUsuarioConectadosDia }