import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { createOrder, verifyPayment } from '../services/paymentService';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';

const Payment = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Step 1: Create order from backend
      const orderResponse = await createOrder({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        amount: parseFloat(data.amount)
      });

      if (!orderResponse.success) {
        toast.error(orderResponse.message || 'Failed to create order');
        return;
      }

      setOrderData(orderResponse);

      // Step 2: Open Razorpay Checkout
      const options = {
        key: orderResponse.key_id,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Payment Gateway',
        description: 'Complete your payment',
        order_id: orderResponse.order_id,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          try {
            const verificationResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResponse.success) {
              // Step 4: Show success message
              Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: `Payment ID: ${response.razorpay_payment_id}`,
                confirmButtonColor: '#3085d6'
              });

              toast.success('Payment completed successfully');
              reset();
              setOrderData(null);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Payment Verification Failed',
                text: verificationResponse.message
              });
              toast.error(verificationResponse.message);
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Verification Error',
              text: error.message || 'Failed to verify payment'
            });
            console.error('Verification error:', error);
          }
        },
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.phone
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h1>Payment Gateway</h1>
          <p>Complete your payment securely</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              id="fullName"
              placeholder="Enter your full name"
              {...register('fullName', {
                required: 'Full name is required'
              })}
            />
            {errors.fullName && (
              <div className="invalid-feedback d-block">
                {errors.fullName.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              placeholder="Enter your phone number"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits'
                }
              })}
            />
            {errors.phone && (
              <div className="invalid-feedback d-block">
                {errors.phone.message}
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="form-label">
              Amount (INR)
            </label>
            <input
              type="number"
              className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              id="amount"
              placeholder="Enter amount"
              step="0.01"
              min="1"
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 1,
                  message: 'Amount must be at least 1'
                }
              })}
            />
            {errors.amount && (
              <div className="invalid-feedback d-block">
                {errors.amount.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 pay-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>

        <div className="payment-footer">
          <p className="text-muted">
            Your payment is secured by Razorpay
          </p>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Payment;
