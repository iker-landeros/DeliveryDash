const pool = require('../helpers/mysql-config')

// Info de todos los cursos
const getCursos = (req, res) => {
    const sql = `SELECT * FROM Cursos`
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

// Agregar un curso
const insertCurso = (req, res) => {
    const { dateInicio, dateFinal, nombre } = req.body
    const sql = `INSERT Cursos(dateInicio, dateFinal, nombre)
                 VALUES(?, ?, ?)`

    let result
    pool.query(sql, [dateInicio, dateFinal, nombre], (err, results, fields) => {
        if (err) res.json(err)
        result = { status: 200, mensaje: 'Curso agregado correctamente' }
        res.json(result)
    })
}

// Borrar un curso por su nombre
const deleteCurso = (req, res) => {
    const { nombre } = req.body
    const sql = `DELETE FROM Cursos WHERE nombre = ?`

    let result
    pool.query(sql, [nombre], (err, results, fields) => {
        if (err) res.json(err)
        result = { status: 200, mensaje: `Curso "${nombre}" borrado correctamente` }
        res.json(result)
    })
}

module.exports = { getCursos, insertCurso, deleteCurso }