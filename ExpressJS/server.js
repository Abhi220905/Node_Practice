const express = require('express')
const allData = require('./views/src/layout/content')
const app = express()

app.set("view engine", "ejs")
require("dotenv").config()

const PORT = process.env.PORT || 5000


// static file
app.use(express.static('public'))
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.render("src/pages/Home", {
        title: "home",
        allData: allData

    })
})

app.get("/about", (req, res) => {
    res.render("src/pages/about", {
        title: "about"
    })
})

app.listen(PORT, () => console.log(`server is connected http://localhost:${PORT}`))