import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      match: [/^[a-zA-Z\s'-]+$/, "Please provide a valid first name"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      match: [/^[a-zA-Z\s'-]+$/, "Please provide a valid last name"],
    },
    address: {
      type: String,
      trim: true,
      default: null,
    },
    city: {
      type: String,
      trim: true,
      default: null,
    },
    state: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNo: {
      type: String,
      match: [/^\d{10,15}$/, "Please provide a valid phone number"],
      default: null,
    },
    image:{
      type: String,
      default: null,
      required:false
    },
    role: {
      type: String,
      enum: ["User", "Lab Admin", "Super Admin"],
      default: "User",
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
      default: null,
    },
    test_name: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);
export default User;
