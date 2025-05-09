import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: false,
        trim: true
    },
    image: { 
        type: String,
        required: false
    },
    contactNumber: {
        type: String,
        required: false
    },
    email: { 
        type: String,
        required: false
    },
    testsAvailable: { 
        type: Number,
        default: 0
    },
    isActive: { 
        type: Boolean,
        default: true
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },
    lastUpdatedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    labAdmin: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique:true,
        sparse: true
    },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }], 
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }], 
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date
    },
    rating: {
    type: Number,
    default: 0 
  },
  ratingCount: {
    type: Number,
    default: 0 
  }
});

const Lab = mongoose.model("Lab", labSchema);
export default Lab;