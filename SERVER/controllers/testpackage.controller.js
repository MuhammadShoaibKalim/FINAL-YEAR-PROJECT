import mongoose from "mongoose";
import { Test, Package } from "../models/testpackage.model.js";
import Lab from "../models/lab.model.js";

// ------------------ TEST CONTROLLERS ------------------

// Create Test
export const createTest = async (req, res) => {
  try {
    const { name, description, price, discount } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required." });
    }

    const lab = req.user.labId; 

    const newTest = await Test.create({
      name,
      description,
      price,
      discount,
      lab,
      createdBy: req.user._id,
    });

    await Lab.findByIdAndUpdate(lab, { $push: { tests: newTest._id } });

    res.status(201).json({ success: true, test: newTest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Test
export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, discount } = req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { name, description, price, discount },
      { new: true }
    );

    if (!updatedTest) return res.status(404).json({ error: "Test not found." });

    res.status(200).json({ success: true, message: "Test updated successfully.", test: updatedTest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Test
export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTest = await Test.findByIdAndDelete(id);
    if (!deletedTest) return res.status(404).json({ error: "Test not found." });

    await Lab.updateMany({}, { $pull: { tests: id } });

    res.status(200).json({ success: true, message: "Test deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Tests
export const getAllTests = async (req, res) => {
  try {
    // const tests = await Test.find()
    //   .populate("createdBy", "name email")
    //   .populate("lab", "name location");
    const tests = await Test.find().select("name price discount lab bookedCount rating");


    res.status(200).json({ success: true, tests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id)
      .populate("createdBy", "name email")
      .populate("lab", "name location");

    if (!test) return res.status(404).json({ error: "Test not found." });

    res.status(200).json({ success: true, test });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------ PACKAGE CONTROLLERS 

// Create Package


export const createPackage = async (req, res) => {
  try {
    const { name, description, price, tests, discount } = req.body;

    if (!name || !price || !tests) {
      return res.status(400).json({ error: "Name, price, and tests are required." });
    }

    const lab = req.user.labId || req.user.lab; 


    const newPackage = await Package.create({
      name,
      description,
      price,
      tests,
      discount,
      lab,
      createdBy: req.user._id,
    });

    await Lab.findByIdAndUpdate(lab, { $push: { packages: newPackage._id } });

    res.status(201).json({ success: true, package: newPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, tests, description, discount } = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { name, price, tests, description, discount },
      { new: true }
    );

    if (!updatedPackage) return res.status(404).json({ error: "Package not found." });

    res.status(200).json({ success: true, message: "Package updated successfully.", package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) return res.status(404).json({ error: "Package not found." });

    await Lab.updateMany({}, { $pull: { packages: id } });

    res.status(200).json({ success: true, message: "Package deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllPackages = async (req, res) => {
  try {
    // const packages = await Package.find()
    //   .populate("tests", "name price")
    //   .populate("createdBy", "name email")
    //   .populate("lab", "name location");
    const packages = await Package.find().select("name price discount lab bookedCount rating description");


    res.status(200).json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const packageItem = await Package.findById(id)
      .populate("tests", "name price")
      .populate("createdBy", "name email")
      .populate("lab", "name location");

    if (!packageItem) return res.status(404).json({ error: "Package not found." });

    res.status(200).json({ success: true, package: packageItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
