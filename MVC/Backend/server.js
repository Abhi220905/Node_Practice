const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
require("./config/db")()


const PORT = process.env.PORT || 3000

app.use(express.urlencoded())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use(cors({
    origin: [process.env.COR_URL || "http://localhost:5173" || "http://localhost:5174"]   // access only this domain

}))


///// import file
const blogRoute = require("./routes/blog.route")

app.use('/api/blogs', blogRoute)

app.get('/', (req, res) => {
    res.send("Server running")
})



app.listen(PORT, () => console.log(`Example App Listing on port http://localhost:${PORT}`))