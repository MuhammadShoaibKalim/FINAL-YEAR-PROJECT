 
import stripe from '../config/stripeConfig.js';
// export const checkoutSession = async (req, res) => {
//   const { products } = req.body;

//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: 'pkr',
//       product_data: {
//         name: product.dish,
//       },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.qnty,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: lineItems,
//     mode: 'payment',
//     success_url: 'http://localhost:5173/success',
//     cancel_url: 'http://localhost:5173/cancel',
//   });

//   res.json({ id: session.id });
// };



export const checkoutSession = async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name, 
      },
      unit_amount: item.price * 100, 
    },
    quantity: item.quantity, 
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/payment/success',
    cancel_url: 'http://localhost:5173/payment/cancel',
  });

  res.json({ id: session.id });
};
