import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
      trim: true,
    },
    email: { 
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverType: {
      type: String,
      enum: ["support", "labadmin", "superadmin"],
      default: "support",
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: { 
      type: String, 
      required: true,
      trim: true,
    },
    response: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["unviewed", "viewed", "responded"],
      default: "unviewed",
    },
  },
  {
    timestamps: true,
  }
);

const Query = mongoose.model("Query", querySchema);
export default Query;
