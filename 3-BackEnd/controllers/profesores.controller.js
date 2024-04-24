const pool = require('../helpers/mysql-config')

const getProfesores = (req, res) => {
    const sql = `SELECT * FROM Profesores`
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertProfesor = (req, res) => {
    const {mail, password, fName, lName} = req.body
    let result = {}
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
    const isValidEmail = emailRegex.test(mail)

    if (isValidEmail) {
        const sql = `INSERT Profesores(mail, password, fName, lName) VALUES(?, SHA2(?, 224), ?, ?)`
        pool.query(sql, [mail, password, fName, lName], (err, results, fields) => {
            if (err) {
                if (err.errno == 1644) res.json({ status: 404, mensaje: err.sqlMessage})    
                else res.json(err)
            }
            else res.json({ status: 200, mensaje: 'Profesor registrado correctamente' })
        })
    } else {
        result = { status: 403, mensaje: 'Email inválido' }
        res.json(result)
    }
}

const deleteProfesores = (req, res) => {
    const { ids } = req.body
    const sql = `CALL deleteProfesores(?)`

    pool.query(sql, [ids], (err, results, fields) => {
        if (err) res.json(err)
        res.json({ status: 200, mensaje: `Profesores ${ids} borrados correctamente` })
    })
}

module.exports = { getProfesores, insertProfesor, deleteProfesores }