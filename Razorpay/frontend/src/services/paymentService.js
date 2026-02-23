import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create Order
export const createOrder = async (formData) => {
  try {
    const response = await apiClient.post('/payment/create-order', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create order' };
  }
};

// Verify Payment
export const verifyPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payment/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to verify payment' };
  }
};

// Get Payment Details
export const getPaymentDetails = async (orderId) => {
  try {
    const response = await apiClient.get(`/payment/details/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch payment details' };
  }
};

export default apiClient;
