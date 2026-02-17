const { store, index } = require("../controllers/subcategory.controller");

const router = require("express").Router();

router
.route('/')
.post(store)
.get(index)

module.exports = router;