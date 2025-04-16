import Lab from "../models/lab.model.js";
import mongoose from "mongoose";
import User from "../models/auth.model.js";

export const addLab = async (req, res) => {
  try {
    if (req.user.role !== "Super Admin") {
      return res.status(403).json({ message: "Access denied. Only Super Admin can create labs." });
    }

    const { name, address, location, description, image } = req.body;

    if (!name || !address || !location || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newLab = await Lab.create({
      name,
      address,
      location,
      description,
      image: image || "",
      isActive: true,
      createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    res.status(201).json({ message: "Lab created successfully", lab: newLab });
  } catch (error) {
    res.status(500).json({ message: "Error creating lab", error: error.message });
  }
};


// export const getAllLabs = async (req, res) => {
//   try {
//     if (req.user.role !== "Super Admin") {
//       return res.status(403).json({ message: "Access denied. Only Super Admin can view all labs." });
//     }

//     const labs = await Lab.find().populate("createdBy", "firstName lastName email");
//     res.status(200).json({ success: true, labs });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching labs", error: error.message });
//   }
// };

// export const getLabById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch lab details and populate 'createdBy'
//     const lab = await Lab.findById(id).populate("createdBy", "firstName lastName email");

//     if (!lab) {
//       return res.status(404).json({ message: "Lab not found" });
//     }

//     // Log user details for debugging
//     console.log("User Info:", req.user);
    
//     // Ensure lab.createdBy exists before checking permissions
//     if (!lab.createdBy || (req.user.role !== "Super Admin" && req.user._id.toString() !== lab.createdBy._id.toString())) {
//       return res.status(403).json({ message: "Access denied. Only the lab owner or Super Admin can view this lab." });
//     }

//     res.status(200).json({ success: true, lab });

//   } catch (error) {
//     console.error("Error fetching lab:", error);
//     res.status(500).json({ message: "Error fetching lab", error: error.message });
//   }
// };
export const getLab = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (req.user.role === "Super Admin") {
      // Super Admin can fetch all labs
      const labs = await Lab.find().populate("createdBy", "firstName lastName email");
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

    const lab = await Lab.findById(id);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    // Check if the user is either Super Admin or the Lab Owner
    if (req.user.role !== "Super Admin" && lab.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied. Only the lab owner or Super Admin can update this lab." });
    }

    const updatedLab = await Lab.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ success: true, message: "Lab updated successfully", lab: updatedLab });
  } catch (error) {
    res.status(500).json({ message: "Error updating lab", error: error.message });
  }
};


export const deleteLab = async (req, res) => {
  try {
    const { id } = req.params;

    const lab = await Lab.findById(id);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    // Check if the user is either Super Admin or the Lab Owner
    if (req.user.role !== "Super Admin" && lab.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied. Only the lab owner or Super Admin can delete this lab." });
    }

    await Lab.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Lab deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lab", error: error.message });
  }
};


