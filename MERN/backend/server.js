const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())



require('dotenv').config()
require('./config/db')

const port = process.env.PORT || 5000
var cookieSession = require('cookie-session')



////////// public middleware
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/', (req, res) => res.send('Hello World!'))


// import router files

const userRouter = require('./routes/user.routes')


//////////// Routing

app.use("/api/user", userRouter)


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))