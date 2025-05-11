import mongoose from "mongoose";

const labApplicationSchema = new mongoose.Schema({
  // Lab Owner Information
  ownerName: {
    type: String,
    required: [true, "Owner name is required"],
    trim: true
  },
  ownerEmail: {
    type: String,
    required: [true, "Owner email is required"],
    trim: true,
    lowercase: true
  },
  ownerPhone: {
    type: String,
    required: [true, "Owner phone is required"],
    trim: true
  },
  ownerCNIC: {
    type: String,
    required: [true, "Owner CNIC is required"],
    trim: true
  },
  ownerAddress: {
    type: String,
    required: [true, "Owner address is required"],
    trim: true
  },

  // Lab Details
  labName: {
    type: String,
    required: [true, "Lab name is required"],
    trim: true
  },
  labAddress: {
    type: String,
    required: [true, "Lab address is required"],
    trim: true
  },
  labPhone: {
    type: String,
    required: [true, "Lab phone is required"],
    trim: true
  },
  cityProvince: {
    type: String,
    required: [true, "City and province is required"],
    trim: true
  },
  labRegistrationNumber: {
    type: String,
    trim: true
  },
  labSpecialties: [{
    type: String,
    trim: true
  }],

  // Digital & Operational Info
  hasInternet: {
    type: Boolean,
    required: [true, "Internet access status is required"]
  },
  hasBookingSoftware: {
    type: Boolean,
    required: [true, "Booking software status is required"]
  },
  bookingSoftwareName: {
    type: String,
    trim: true
  },
  staffCount: {
    type: Number,
    required: [true, "Staff count is required"],
    min: [1, "Staff count must be at least 1"]
  },
  offersHomeCollection: {
    type: Boolean,
    required: [true, "Home collection status is required"]
  },
  labLicense: {
    type: String,
    required: [true, "Lab license is required"]
  },

  // Application Status
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
labApplicationSchema.index({ ownerEmail: 1 });
labApplicationSchema.index({ status: 1 });
labApplicationSchema.index({ createdAt: -1 });

const LabApplication = mongoose.model("LabApplication", labApplicationSchema);

export default LabApplication; 