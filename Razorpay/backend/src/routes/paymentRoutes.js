import express from 'express';
import {
  createOrder,
  verifyPayment,
  getPaymentDetails
} from '../controllers/paymentController.js';

const router = express.Router();

// Create Order
router.post('/create-order', createOrder);

// Verify Payment
router.post('/verify-payment', verifyPayment);

// Get Payment Details
router.get('/details/:orderId', getPaymentDetails);

export default router;
