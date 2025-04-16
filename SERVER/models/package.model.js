import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    bookedCount: { type: Number, default: 0 },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
    feedbacks: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", default: null },
    image: { type: String, trim: true },
    bookingDetails: {
      date: { type: Date, default: null },
      time: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
