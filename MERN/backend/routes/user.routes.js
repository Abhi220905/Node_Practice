// const express  =  require('express')
// const router = express.Router()

const { signup, login, getProfile, checkAuth, removeCookie } = require("../controllers/user.controller");
const { verifyUser } = require("../middleware/verify");

const router  = require("express").Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/checkAuth', verifyUser, checkAuth)
router.get('/removeCookie', verifyUser, removeCookie)
router.get('/getProfile',verifyUser, getProfile)

module.exports = router