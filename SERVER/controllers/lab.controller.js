import Lab from "../models/lab.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const addLab = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Only Super Admin can create labs." });
    }

    const { name, address, location, description, type, assignedAdmin  } = req.body;

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

    res.status(201).json({ 
      success: true,
      message: "Lab created successfully",
      lab: newLab
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

    // Fetch lab details and populate 'createdBy'
    const lab = await Lab.findById(id).populate("createdBy", "firstName lastName email");

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    // Log user details for debugging
    console.log("User Info:", req.user);
    
    // Ensure lab.createdBy exists before checking permissions
    if (!lab.createdBy || (req.user.role !== "Super Admin" && req.user._id.toString() !== lab.createdBy._id.toString())) {
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
      // Super Admin can fetch all labs
      const labs = await Lab.find().populate("createdBy", "firstName lastName email").populate("labAdmin", "firstName lastName ");
      return res.status(200).json({ success: true, labs });
    } else if (req.user.role === "Lab Admin") {
      // Lab Admin can fetch only their assigned lab
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




