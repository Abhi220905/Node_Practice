const { store, index } = require('../controllers/blog.controller')

const app = require('express')()

app.post('/',store)
app.get('/',index)


module.exports = app