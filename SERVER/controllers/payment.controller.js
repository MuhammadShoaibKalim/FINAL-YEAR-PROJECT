import stripe from '../config/stripeConfig.js';
import axios from 'axios';

export const checkoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    const conversionRes = await axios.get("https://api.exchangerate.host/convert", {
      params: {
        from: 'PKR',
        to: 'USD',
      },
    });

    const rate = conversionRes.data.info.rate;
    console.log("PKR to USD Rate:", rate);

    const lineItems = items.map((item) => {
      const priceInPKR = item.price;
      const priceInUSD = priceInPKR * rate;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(priceInUSD * 100), 
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/payment/success',
      cancel_url: 'http://localhost:5173/payment/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Checkout error:", error.message);
    res.status(500).json({ error: "Payment session failed" });
  }
};
