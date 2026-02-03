const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())

require('dotenv').config()
require('./config/db')

const port = process.env.PORT || 5000
app.get('/', (req, res) => res.send('Hello World!'))


// import router files

const userRouter = require('./routes/user.routes')


//////////// Routing

app.use("/api/user", userRouter)


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))