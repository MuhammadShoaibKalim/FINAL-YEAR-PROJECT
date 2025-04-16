import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testOrPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "type",
      required: true,
    },
    type: {
      type: String,
      enum: ["Test", "Package"],
      required: true,
    },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phoneNumber: {
      type: String,
      match: [/^\d{10,15}$/, "Please provide a valid phone number"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    address: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    collectionMethod: {
      type: String,
      enum: ["Home Collection", "Lab Visit"],
      required: true,
    },
    bookingDetails: {
      date: { type: Date, required: true },
      time: { type: String, trim: true, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Approved", "Cancelled"],
      default: "Pending",
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    resultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
      default: null,
    },
  },
  { timestamps: true }
);

OrderSchema.pre("save", function (next) {
  this.totalPrice = this.subtotal + this.deliveryCharge;
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
