// app/checkout/page.tsx
'use client';
import React, { useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window { Razorpay?: any }
}

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const cartItems = [{ id: 1, price: 500, qty: 2 }];
  const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0); // rupees
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!scriptLoaded) throw new Error('Payment script not loaded');

      // Create order on the server
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          cartItems,
          customerInfo: { email: 'test@example.com' },
        }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order?.error || 'Order creation failed');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Youbairia',
        description: `Order ${order.id}`,
        order_id: order.id,
        prefill: { name: 'Customer', email: 'test@example.com', contact: '' },
        handler: async (resp: any) => {
          // Verify on server
          const verify = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resp),
          });
          const v = await verify.json();
          if (v.success) setMessage('Payment successful 🎉');
          else setMessage('Payment verification failed ❌');
        },
        modal: {
          ondismiss: () => setMessage('Payment cancelled by user'),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setMessage(err?.message || 'Payment error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onError={() => setMessage('Failed to load checkout script')}
      />
      <h2>Checkout — ₹{total}</h2>
      <button onClick={handlePay} disabled={loading || !scriptLoaded}>
        {loading ? 'Processing…' : `Pay ₹${total}`}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}