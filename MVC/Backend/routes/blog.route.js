const { store, index } = require('../controllers/blog.controller')
const upload = require('../middleware/upload')

const app = require('express')()

app.post('/', upload.single('b_image'), store)
app.get('/',index)


module.exports = app