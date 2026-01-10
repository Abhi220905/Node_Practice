const express = require('express')
const app = express()

require('dotenv').config() // Always on the top of declear

const PORT = process.env.PORT || 5000

// method 1
// const db = require('./config/db')
// db()

//method 2
require('./config/db')()



app.get("/", (_, res) => {
    res.send("Server Connect")
})

app.listen(PORT, () => console.log(`Application running in port number http://localhost:${PORT}`))
