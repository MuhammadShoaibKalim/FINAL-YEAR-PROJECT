import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lab',
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  }, { timestamps: true });
  
  export const Review = mongoose.model("Review", ReviewSchema);
  