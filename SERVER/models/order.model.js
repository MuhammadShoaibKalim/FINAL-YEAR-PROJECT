import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
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
  
  testOrPackageId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'type',
    required: true
  },
  type: {
    type: String,
    enum: ['Test', 'Package'],
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export const Cart = mongoose.model("Cart", CartSchema);

// Order schema
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { 
    type: String, 
    required: true 
  },
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
    min: 0 
  },
  address: { 
    type: String, 
    required: true 
  },
  state: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "unpaid"],
    default: "pending",
  },
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
reportFile: {
  type: String,
  default: null,
},
  subtotal: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  deliveryCharge: { 
    type: Number, 
    default: 0 
  },
  totalPrice: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  resultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Result",
    default: null,
  },
  items: [
    {
      testOrPackageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "TestOrPackage",
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      type: { type: String, enum: ["Test", "Package"], required: true },
      labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Cancelled"],
        default: "Pending"
      },
      reportFile: {
        type: String,
        default: null
      }
    },
  ],
}, { timestamps: true });

OrderSchema.pre("save", function (next) {
  this.totalPrice = this.subtotal + this.deliveryCharge;
  next();
});

export const Order = mongoose.model("Order", OrderSchema);


// Result schema
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
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "labadmin", 
      required: true,
    },
  },
  { timestamps: true }
);
export const Result = mongoose.model("Result", ResultSchema);


