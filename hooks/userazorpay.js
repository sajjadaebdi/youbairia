// hooks/useRazorpay.js - Custom hook for Razorpay integration
import { useState, useCallback } from 'react';

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(async ({
    amount,
    orderData,
    customerInfo,
    onSuccess,
    onFailure
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order on your backend
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount,
          orderData // Pass your existing order data
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const order = await orderResponse.json();

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData // Include your order data for verification
              }),
            });

            const verifyResult = await verifyResponse.json();
            
            if (verifyResult.success) {
              onSuccess && onSuccess(response, verifyResult);
            } else {
              onFailure && onFailure('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onFailure && onFailure('Payment verification failed');
          }
        },
        prefill: {
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          contact: customerInfo.phone || '',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            onFailure && onFailure('Payment cancelled by user');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      setError(error.message);
      onFailure && onFailure(error.message);
    } finally {
      setLoading(false);
    }
  }, [loadRazorpayScript]);

  return {
    initiatePayment,
    loading,
    error
  };
};