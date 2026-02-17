const { store, index } = require("../controllers/category.controller");

const router = require("express").Router();

router
.route('/')
.post(store)
.get(index)

// router
// .route('/:id')
// .delete()
// .put()

module.exports = router;