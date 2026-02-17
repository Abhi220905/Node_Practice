const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded())

require('dotenv').config()
require('./config/db')

const port = process.env.PORT || 5000
var cookieSession = require('cookie-session')


//// origin can access only mention domain,
//// cookie can secure data bcz it can be connected in Server 

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))

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
const categoryRouter = require('./routes/category.routes')
const subCategoryRouter = require('./routes/subCategory.routes')


//////////// Routing

app.use("/api/user", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/subcategory", subCategoryRouter)

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))