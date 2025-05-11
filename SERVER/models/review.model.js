import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update lab rating when a review is added
reviewSchema.post('save', async function() {
  const Lab = mongoose.model('Lab');
  const reviews = await this.constructor.find({ lab: this.lab });
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  await Lab.findByIdAndUpdate(this.lab, {
    rating: averageRating,
    ratingCount: reviews.length
  });
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
  