// const express  =  require('express')
// const router = express.Router()

const { signup, login, getProfile } = require("../controllers/user.controller");
const { verifyUser } = require("../middleware/verify");
const router  = require("express").Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/getProfile',verifyUser, getProfile)

module.exports = router