const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

require('dotenv').config() // Always on the top of declear

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL)
    .then(() => { console.log("db connected❤️") })
    .catch(error => console.log(error));


app.get("/", (_, res) => {
    res.send("Server Connect")
})

app.listen(PORT, () => console.log(`Application running in port number http://localhost:${PORT}`))
