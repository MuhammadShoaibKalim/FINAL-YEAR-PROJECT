import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: { type: String, required: true },
  response: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["unviewed", "viewed", "responded"],
    default: "unviewed",
  },
  createdAt: { type: Date, default: Date.now },
});

const Query = mongoose.model("Query", querySchema);
export default Query;
