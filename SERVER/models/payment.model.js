import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Cash On Delivery"],
      required: true,
    },
    transactionId: {
      type: String, 
      required: function () {
        return this.paymentMethod !== "Cash On Delivery";
      },
      unique: true,
      sparse: true, 
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    failureReason: {
      type: String, 
      default: null,
    },
    refundedAt: {
      type: Date,
      default: null, 
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
