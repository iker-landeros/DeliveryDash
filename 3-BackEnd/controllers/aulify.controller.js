
const validateUser = async (req, res) => {
    const data = req.body
    
    const results = await fetch('https://www.aulify.mx/isAulifyClient', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    const validation = await results.json()

    res.json(validation)
}

module.exports = { validateUser }