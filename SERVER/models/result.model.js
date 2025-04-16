import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: function () {
        return !this.packageId;
      },
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: function () {
        return !this.testId;
      },
    },
    resultFile: {
      type: String, 
      required: true,
    },
    remarks: {
      type: String, 
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabAdmin", 
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", ResultSchema);
export default Result;
