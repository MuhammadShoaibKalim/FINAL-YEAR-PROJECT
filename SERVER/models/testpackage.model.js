import mongoose from "mongoose";

// Test Schema
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    min: 0, max: 5,
    default: 0
  },
  bookedCount: {
    type: Number,
    default: 0
  },
  feedbacks: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      review: { type: String, trim: true },
      rating: { type: Number, min: 1, max: 5 },
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required:
      true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  discount: { 
    type: Number, 
    default: 0 
  },
  lab: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Lab",
  required: true,
},
},
  {
    timestamps: true
  }
);
export const Test = mongoose.model("Test", testSchema);

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test"
    }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  bookedCount: {
    type: Number,
    default: 0
  },
  feedbacks: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    review: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5 },
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  discount: { 
    type: Number, 
    default: 0 
  },
lab: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Lab",
  required: true,
},},
  {
    timestamps: true
  });

export const Package = mongoose.model("Package", packageSchema);
