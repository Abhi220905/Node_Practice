// const express  =  require('express')
// const router = express.Router()

const { signup, login } = require("../controllers/user.controller");
const router  = require("express").Router();

router.post('/signup', signup)
router.post('/login', login)

module.exports = router