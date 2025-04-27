import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, 
  },
  receiverType: {
    type: String,
    enum: ["support", "labadmin"],
    default: "support",
  },
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
    required: false, 
  },
  subject: {
    type: String,
    required: true,
  },
  message: { 
    type: String, 
    required: true
  },
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
