const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000

require("./config/db")()
app.use(express.urlencoded())
app.use(express.json())

///// import file
const blogRoute = require("./routes/blog.route")

app.use('/api/blogs', blogRoute)

app.get('/', (req, res) => {
    res.send("Server running")
})



app.listen(PORT, () => console.log(`Example App Listing on port http://localhost:${PORT}`))