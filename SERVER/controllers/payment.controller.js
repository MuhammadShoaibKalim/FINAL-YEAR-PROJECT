import stripe from '../config/stripeConfig.js';
import axios from 'axios';

export const checkoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    let rate = 0.0035;

    try {
      const conversionRes = await axios.get("https://api.exchangerate.host/convert", {
        params: { from: "PKR", to: "USD" },
      });

      if (conversionRes.data?.info?.rate) {
        rate = conversionRes.data.info.rate;
        console.log("Live PKR to USD rate:", rate);
      } else {
        console.warn("Using fallback conversion rate.");
      }
    } catch (error) {
      console.warn("Currency API error. Using fallback rate.");
    }

    const lineItems = items.map((item) => {
      const priceInUSD = item.price * rate;
      const roundedAmount = Math.round(priceInUSD * 100);

      if (roundedAmount < 50) {
        throw new Error(`Item ${item.name} has too low price after conversion.`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: roundedAmount,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/cancel",
    });

    return res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    return res.status(500).json({ error: "Payment session failed", message: error.message });
  }
};

