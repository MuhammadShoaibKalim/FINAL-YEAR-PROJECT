import Lab from "../models/lab.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { Test, Package } from "../models/testpackage.model.js";
import { Order } from "../models/order.model.js";
import { sendEmail } from "../utils/sendEmail.util.js";
import LabApplication from "../models/labApplication.model.js";
import {
  sendApplicationSubmittedEmail,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail
} from '../utils/emailService.util.js';
import bcrypt from 'bcryptjs';
import Review from "../models/review.model.js";

// export const addLab = async (req, res) => {
//   try {
//     if (req.user.role !== "superadmin") {
//       return res.status(403).json({ message: "Access denied. Only Super Admin can create labs." });
//     }

//     const { name, address, location, description, type, assignedAdmin  } = req.body;

//     if (!name || !address || !location || !description || !type || !assignedAdmin) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const isActive = req.body.isActive === "true" || req.body.isActive === "on";
//     const image = req.file ? req.file.path : "";


//     const labAdmin = await User.findById(assignedAdmin);
//     if (!labAdmin) {
//       return res.status(404).json({ message: "Lab Admin not found" });
//     }

//     const existingLab = await Lab.findOne({ labAdmin: assignedAdmin });
//     if (existingLab) {
//       return res.status(400).json({
//         success: false,
//         message: "Lab admin is already assigned to another lab.",
//       });
//     }



//     const newLab = await Lab.create({
//       name,
//       address,
//       location,
//       description,
//       type,
//       image,
//       isActive,
//       createdBy: req.user._id,
//       labAdmin: assignedAdmin,
//     });

//     res.status(201).json({ 
//       success: true,
//       message: "Lab created successfully",
//       lab: newLab
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Error creating lab", error: error.message });
//   }
// };
export const addLab = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Only Super Admin can create labs." });
    }

    const { name, address, location, description, type, assignedAdmin } = req.body;

    if (!name || !address || !location || !description || !type || !assignedAdmin) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const isActive = req.body.isActive === "true" || req.body.isActive === "on";
    const image = req.file ? req.file.path : "";

    const labAdmin = await User.findById(assignedAdmin);
    if (!labAdmin) {
      return res.status(404).json({ message: "Lab Admin not found" });
    }

    const existingLab = await Lab.findOne({ labAdmin: assignedAdmin });
    if (existingLab) {
      return res.status(400).json({
        success: false,
        message: "Lab admin is already assigned to another lab.",
      });
    }

    const newLab = await Lab.create({
      name,
      address,
      location,
      description,
      type,
      image,
      isActive,
      createdBy: req.user._id,
      labAdmin: assignedAdmin,
    });

    // Send lab assignment email
    await sendEmail({
      to: labAdmin.email,
      subject: "You've Been Assigned a Lab - Digital TestSahulat",
      html: `
        <p>Hello ${labAdmin.firstName},</p>
        <p>You have been assigned as the admin of the lab: <strong>${name}</strong>.</p>
        <p>Please login and start managing your lab.</p>
        <a href="${process.env.FRONTEND_URL}/login">Login Here</a>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Lab created and assignment email sent.",
      lab: newLab,
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating lab", error: error.message });
  }
};

export const getAllLabs = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Only Super Admin can view all labs." });
    }

    const labs = await Lab.find().populate("createdBy", "firstName lastName email").populate("labAdmin", "firstName lastName email");
    res.status(200).json({ success: true, labs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching labs", error: error.message });
  }
};
export const getLabById = async (req, res) => {
  try {
    const { id } = req.params;

    const lab = await Lab.findById(id).populate("createdBy", "firstName lastName email");

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    // console.log("User Info:", req.user);

    if (!lab.createdBy || (req.user.role !== "superadmin" && req.user._id.toString() !== lab.createdBy._id.toString())) {
      return res.status(403).json({ message: "Access denied. Only the lab owner or Super Admin can view this lab." });
    }

    res.status(200).json({ success: true, lab });

  } catch (error) {
    console.error("Error fetching lab:", error);
    res.status(500).json({ message: "Error fetching lab", error: error.message });
  }
};
export const getLab = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (req.user.role === "superadmin") {
      const labs = await Lab.find().populate("createdBy", "firstName lastName email").populate("labAdmin", "firstName lastName ");
      return res.status(200).json({ success: true, labs });
    } else if (req.user.role === "Lab Admin") {
      const lab = await Lab.findOne({ createdBy: req.user._id }).populate("createdBy", "firstName lastName email");

      if (!lab) {
        return res.status(404).json({ message: "Lab not found" });
      }

      return res.status(200).json({ success: true, lab });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching lab(s)", error: error.message });
  }
};
export const updateLab = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, assignedAdmin, image } = req.body;

    const lab = await Lab.findById(id);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    // if (
    //   req.user.role !== "superadmin" &&
    //   lab.createdBy.toString() !== req.user._id.toString() &&
    //   lab.labAdmin?.toString() !== req.user._id.toString()
    // ) {
    //   return res.status(403).json({ message: "Access denied. Only the lab owner or assigned Lab Admin can modify this lab." });
    // }

    if (
      req.user.role !== "superadmin" &&
      lab.createdBy.toString() !== req.user._id.toString() &&
      lab.labAdmin?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied. Only the lab owner or assigned Lab Admin can modify this lab." });
    }

    // if (req.file) {
    //   lab.image = req.file.path; 
    // }
    if (req.file) {
      lab.image = req.file.path;
    }

    lab.name = req.body.name || lab.name;
    lab.address = req.body.address || lab.address;
    lab.location = req.body.location || lab.location;
    lab.description = req.body.description || lab.description;
    lab.type = req.body.type || lab.type;
    lab.isActive = req.body.isActive === "true" || req.body.isActive === "on";
    lab.labAdmin = req.body.assignedAdmin || lab.labAdmin;

    await lab.save();


    // const updatedLab = await Lab.findByIdAndUpdate(
    //   id,
    //   {
    //     name,
    //     location,
    //     labAdmin: assignedAdmin, 
    //   },
    //   { new: true }
    // );

    // if (assignedAdmin) {
    //   await User.findByIdAndUpdate(assignedAdmin, { labId: updatedLab._id });
    // }
    if (req.body.assignedAdmin) {
      await User.findByIdAndUpdate(req.body.assignedAdmin, { labId: lab._id });
    }

    // res.status(200).json({ success: true, message: "Lab updated successfully", lab: updatedLab });
    res.status(200).json({ success: true, message: "Lab updated successfully", lab });

  } catch (error) {
    res.status(500).json({ message: "Error updating lab", error: error.message });
  }
};
export const deleteLab = async (req, res) => {
  try {
    const { id } = req.params;

    const lab = await Lab.findById(id);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    // Allow only Super Admin, Lab Creator, or Assigned Lab Admin
    if (
      req.user.role !== "superadmin" &&
      lab.createdBy.toString() !== req.user._id.toString() &&
      lab.labAdmin?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied. Only the lab owner or assigned Lab Admin can delete this lab." });
    }

    // Unassign labId from Lab Admin (optional but good practice)
    if (lab.labAdmin) {
      await User.findByIdAndUpdate(lab.labAdmin, { $unset: { labId: "" } });
    }

    // Delete the lab
    await Lab.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Lab deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lab", error: error.message });
  }
};
export const getPublicLabs = async (req, res) => {
  try {
    const labs = await Lab.find({ isActive: true }).select("name address location description image rating");
    res.status(200).json({ success: true, labs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching labs", error: error.message });
  }
};
export const getPublicLabById = async (req, res) => {
  try {
    const { id } = req.params;
    const lab = await Lab.findById(id).select("name address location description image rating");

    if (!lab) {
      return res.status(404).json({ success: false, message: "Lab not found" });
    }

    res.status(200).json({ success: true, lab });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lab", error: error.message });
  }
};
export const getAllLabsPublic = async (req, res) => {
  try {
    const labs = await Lab.find({ isActive: true })
      .select("name address location description image rating _id")
      .populate("labAdmin", "firstName lastName email");
    res.status(200).json({ success: true, labs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch labs", error: error.message });
  }
};
export const applyForLab = async (req, res) => {
  try {
    const {
      ownerName,
      ownerEmail,
      ownerPhone,
      ownerCNIC,
      ownerAddress,
      labName,
      labAddress,
      labPhone,
      cityProvince,
      labRegistrationNumber,
      labSpecialties,
      hasInternet,
      hasBookingSoftware,
      bookingSoftwareName,
      staffCount,
      offersHomeCollection
    } = req.body;

    // Validate required fields
    if (!ownerName || !ownerEmail || !ownerPhone || !labName || !labAddress) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ownerEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Validate phone number format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(ownerPhone)) {
      return res.status(400).json({ message: 'Please enter a valid phone number' });
    }

    // Check if lab license file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload your lab license' });
    }

    // Create new lab application
    const application = new LabApplication({
      ownerName,
      ownerEmail,
      ownerPhone,
      ownerCNIC,
      ownerAddress,
      labName,
      labAddress,
      labPhone,
      cityProvince,
      labRegistrationNumber,
      labSpecialties: labSpecialties ? labSpecialties.split(',').map(s => s.trim()) : [],
      hasInternet,
      hasBookingSoftware,
      bookingSoftwareName,
      staffCount,
      offersHomeCollection,
      labLicense: req.file.path
    });

    await application.save();

    // Send confirmation email
    await sendApplicationSubmittedEmail(labName, ownerEmail);

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
};
export const getLabApplications = async (req, res) => {
  try {
    const applications = await LabApplication.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error("Error in getLabApplications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lab applications",
      error: error.message
    });
  }
};
export const updateLabApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await LabApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    if (status === 'approved') {
      // Generate a random password
      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create lab admin user
      const user = new User({
        email: application.ownerEmail,
        password: hashedPassword,
        role: 'lab_admin',
        name: application.ownerName
      });
      await user.save();

      // Create lab
      const lab = new Lab({
        name: application.labName,
        address: application.labAddress,
        phone: application.labPhone,
        city: application.cityProvince,
        registrationNumber: application.labRegistrationNumber,
        specialties: application.labSpecialties,
        hasInternet: application.hasInternet,
        hasBookingSoftware: application.hasBookingSoftware,
        bookingSoftwareName: application.bookingSoftwareName,
        staffCount: application.staffCount,
        offersHomeCollection: application.offersHomeCollection,
        license: application.labLicense,
        admin: user._id
      });
      await lab.save();

      // Send approval email with credentials
      await sendApplicationApprovedEmail(application.labName, application.ownerEmail, password);
    } else {
      // Send rejection email
      await sendApplicationRejectedEmail(application.labName, application.ownerEmail, reason);
    }

    res.json({
      message: `Application ${status} successfully`,
      application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
};
export const addReview = async (req, res) => {
  try {
    const { labId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const review = await Review.create({
      lab: labId,
      user: req.user._id,
      rating,
      comment
    });

    // Populate user details for the response
    await review.populate('user', 'firstName lastName');

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};
export const getLabReviews = async (req, res) => {
  try {
    const { labId } = req.params;
    const reviews = await Review.find({ lab: labId })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};







