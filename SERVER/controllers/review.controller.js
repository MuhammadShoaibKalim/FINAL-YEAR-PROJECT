// POST /reviews
import { Review } from '../models/Review';
import { Order } from '../models/Order';

export const createReview = async (req, res) => {
  try {
    const { orderId, rating, description } = req.body;

    // Find the order to ensure it's completed
    const order = await Order.findById(orderId).populate('userId labId');
    if (!order || order.status !== 'Completed') {
      return res.status(400).json({ message: 'Order is not completed yet.' });
    }

    // Create the review
    const review = new Review({
      userId: order.userId._id,
      labId: order.labId._id,
      orderId,
      rating,
      description
    });

    await review.save();

    // Optionally, update the lab's average rating here
    // You can store average ratings in the Lab model or calculate dynamically

    return res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};
