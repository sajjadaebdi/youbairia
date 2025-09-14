// app/api/create-order/route.ts
export const runtime = 'nodejs'; // ensure Node runtime for razorpay SDK

import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(req: Request) {
  try {
    const { amount, cartItems, customerInfo } = await req.json();
    if (!amount) return NextResponse.json({ error: 'Amount required' }, { status: 400 });

    const amountInPaise = Math.round(Number(amount) * 100);
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: {
        customerEmail: customerInfo?.email || '',
        cartSize: String(cartItems?.length || 0),
      },
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (err: any) {
    console.error('create-order error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}