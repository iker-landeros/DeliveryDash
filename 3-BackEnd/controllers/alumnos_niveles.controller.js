const pool = require('../helpers/mysql-config')

const getObtainedStars = (req, res) => {
    const { mail } = req.body
    const sql_id = `SELECT alumnoID FROM Alumnos WHERE mail = ?`

    let result = {}
    pool.query(sql_id, [mail], (err, results, fields) => {
        if (err) res.json(err)
        const sql_stars = `SELECT nivelID, obtainedStars FROM Alumnos_Niveles WHERE alumnoID = ?`

        pool.query(sql_stars, [results[0].alumnoID], (err, results, fields) => {
            if (err) res.json(err)
            else if (results.length > 0) res.json(results)
            else {
                result = { obtainedStars: 0 }
                res.json(result)
            }
        }) 
    })
}

const insertNivelCompletado = (req, res) => {
    const { mail, nivelID, obtainedStars } = req.body
    const sql_id = `SELECT alumnoID FROM Alumnos WHERE mail = ?`

    let result = {}
    pool.query(sql_id, [mail], (err, results, fields) => {
        if (err) res.json(err)
        const sql_stars = `INSERT Alumnos_Niveles(nivelID, alumnoID, obtainedStars) VALUES(?, ?, ?)`

        pool.query(sql_stars, [nivelID, results[0].alumnoID, obtainedStars], (err, results, fields) => {
            if (err) res.json(err)
            else {
                result = { status:200, mensaje:'Progreso agregado correctamente' }
                res.json(result)
            }
        }) 
    })
}

module.exports = { getObtainedStars, insertNivelCompletado }