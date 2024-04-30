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
                     A.mail,
                     NC.nivelID,
                     MAX(NC.obtainedStars) AS obtainedStars
                 FROM NivelesCompletados NC
                 JOIN Alumnos A ON NC.alumnoID = A.alumnoID
                 WHERE mail = ?
                 GROUP BY NC.alumnoID, NC.nivelID`

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

const getPromedioTiempoNivelByCourse = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT nc.nivelID as nivel, 
                    ROUND(AVG((TIMESTAMPDIFF(MINUTE, dateInicio, dateFinal))),2) AS promedio
                FROM NivelesCompletados as nc
                JOIN Alumnos as a
                ON nc.alumnoID = a.alumnoID
                JOIN Inscripciones as i
                ON a.alumnoID = i.alumnoID
                WHERE i.cursoID = ?
                GROUP BY nc.nivelID
                HAVING promedio > 0`

    pool.query(sql, [cursoID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const getMinutosTotalesByCourse = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT SUM((TIMESTAMPDIFF(MINUTE, dateInicio, dateFinal))) as minutos
                FROM NivelesCompletados as nc
                INNER JOIN Alumnos as a
                ON nc.alumnoID = a.alumnoID
                INNER JOIN Inscripciones as i
                ON a.alumnoID = i.alumnoID
                WHERE i.cursoID = ?
                GROUP BY cursoID`

    pool.query(sql, [cursoID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}


const getEstrellasTotalesByCourse = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT sum(obtainedStars) AS estrellasTotales
                FROM NivelesCompletados as nc
                JOIN Alumnos as a
                ON nc.alumnoID = a.alumnoID
                JOIN Inscripciones as i
                ON a.alumnoID = i.alumnoID
                WHERE i.cursoID = ?
                GROUP BY i.cursoID;`

    pool.query(sql, [cursoID], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}
const getTotalNivelesCompletadosByCourse = (req, res) => {
    const { cursoID } = req.body
    const sql = `SELECT COUNT(*) as NivelesCompletados
                    FROM NivelesCompletados`

    pool.query(sql, [cursoID], (err, results, fields) => {
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
module.exports = {  getNivelesCompletados, 
                    getNivelesCompletadosByAlumno, 
                    insertNivelCompletado, 
                    getTotalStars, 
                    getHorasTotalPorMes, 
                    getTotalNivelesCompletados, 
                    getPromedioTiempoNivel, 
                    getTiempoTotal, 
                    getUsuarioConectadosDia,
                    getPromedioTiempoNivelByCourse,
                    getEstrellasTotalesByCourse,
                    getTotalNivelesCompletadosByCourse,
                    getMinutosTotalesByCourse }