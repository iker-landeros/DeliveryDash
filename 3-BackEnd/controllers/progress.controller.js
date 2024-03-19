const pool = require('../helpers/mysql-config')

const getProgress = (req, res) => {
    const sql = `SELECT * FROM Progress`
    
    pool.query(sql, (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

const insertProgress = (req, res) => {
    const {userID, level, stars} = req.body
    const sql = `INSERT INTO Progress(userID, level, stars)
                 VALUES(?, ?, ?)`
    
    pool.query(sql, [userID, level, stars], (err, results, fields) => {
        if (err) res.json(err)
        res.json(results)
    })
}

module.exports = { getProgress, insertProgress }