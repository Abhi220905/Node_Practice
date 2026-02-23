import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true
    },
    razorpay_order_id: {
      type: String,
      required: true
    },
    razorpay_payment_id: {
      type: String,
      default: null
    },
    razorpay_signature: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
