const { store, index, trash, update } = require('../controllers/blog.controller')
const upload = require('../middleware/upload')

const app = require('express')()

app.post('/', upload.single('b_image'), store)
app.get('/',index)
app.delete('/',trash)
app.put('/:id', upload.single('b_image'), update)

module.exports = app