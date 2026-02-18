// const express  =  require('express')
// const router = express.Router()

const { signup, login, getProfile, checkAuth, removeCookie, sendOtp, verifyOtp, changePassword } = require("../controllers/user.controller");
const { verifyUser, verifyRole } = require("../middleware/verify");

const router  = require("express").Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, mobile, username]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *              username:
 *                type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */
router.post('/signup', signup)

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login)

// router.get('/checkAuth', verifyUser, checkAuth)
// router.get('/removeCookie', verifyUser, removeCookie)
// router.get('/getProfile',verifyUser, getProfile)

/**
 * @swagger
 * /api/user/sendOtp:
 *   post:
 *     summary: Send OTP to user email (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       403:
 *         description: Unauthorized - Admin access required
 */
router.post('/sendOtp',verifyUser, verifyRole(['admin']), sendOtp) 

/**
 * @swagger
 * /api/user/verifyOtp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, otp]
 *             properties:
 *               password:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post('/verifyOtp', verifyOtp)

/**
 * @swagger
 * /api/user/changePassword:
 *   post:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [old_password, new_password]
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/changePassword', verifyUser, changePassword)

module.exports = router