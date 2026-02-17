// const express  =  require('express')
// const router = express.Router()

const { signup, login, getProfile, checkAuth, removeCookie, sendOtp, verifyOtp } = require("../controllers/user.controller");
const { verifyUser, verifyRole } = require("../middleware/verify");

const router  = require("express").Router();

router.post('/signup', signup)
router.post('/login', login)
// router.get('/checkAuth', verifyUser, checkAuth)
// router.get('/removeCookie', verifyUser, removeCookie)
// router.get('/getProfile',verifyUser, getProfile)
router.post('/sendOtp',verifyUser, verifyRole(['admin']), sendOtp) 
router.post('/verifyOtp', verifyOtp)

module.exports = router