import mongoose from "mongoose";
import Test from "../models/test.model.js";
import Package from "../models/package.model.js";
import Lab from "../models/lab.model.js";

// ====== TESTS ======
export const createTest = async (req, res) => {
  try {
    const { name, price, description, lab } = req.body;
    if (!name || !price || !lab) return res.status(400).json({ error: "Name, price, and lab are required." });

    const test = new Test({
      name,
      price,
      description,
      rating: 0,
      feedback: [],
      bookingCount: 0,
      createdBy: req.user._id,
      labAdmin: req.user._id,
      lab: new mongoose.Types.ObjectId(lab),

    });

    console.log("Saving Test:", test);
    await test.save();

    await Lab.findByIdAndUpdate(lab, { $push: { tests: test._id } });

    res.status(201).json({ success: true, message: "Test created successfully", test });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      id, { name, price, description }, { new: true }
    );

    if (!updatedTest) return res.status(404).json({ error: "Test not found" });

    res.status(200).json({ success: true, message: "Test updated successfully", test: updatedTest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTest = await Test.findByIdAndDelete(id);
    if (!deletedTest) return res.status(404).json({ message: "Test not found" });

    await Lab.updateMany({}, { $pull: { tests: id } });

    res.status(200).json({ success: true, message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .populate("createdBy", "name email")
      .populate("lab", "name location");

    res.status(200).json({ success: true, tests, message: "All tests fetched successfully" });
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

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.status(200).json({ test, message: "Test fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ====== PACKAGES ======
export const createPackage = async (req, res) => {
  try {
    const { name, price, tests, lab } = req.body;
    if (!name || !price || !tests || !lab) return res.status(400).json({ error: "Name, price, tests, and lab are required." });

    const testIds = tests.map(testId => new mongoose.Types.ObjectId(testId));

    const packageItem = new Package({
      name,
      price,
      tests: testIds,
      rating: 0,
      feedback: [],
      bookingCount: 0,
      createdBy: req.user._id,
      labAdmin: req.user._id,
      lab: new mongoose.Types.ObjectId(lab),

    });

    console.log("Saving package:", packageItem);
    await packageItem.save();

    await Lab.findByIdAndUpdate(lab, { $push: { packages: packageItem._id } });

    res.status(201).json({ success: true, message: "Package created successfully", package: packageItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, tests } = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(
      id, { name, price, tests }, { new: true }
    );

    if (!updatedPackage) return res.status(404).json({ error: "Package not found" });

    res.status(200).json({ success: true, message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const packageItem = await Package.findByIdAndDelete(id);
    if (!packageItem) return res.status(404).json({ error: "Package not found" });

    // Remove from labs
    await Lab.updateMany({}, { $pull: { packages: id } });

    res.status(200).json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .populate("tests", "name price")
      .populate("createdBy", "name email")
      .populate("lab", "name location");

    res.status(200).json({ success: true, packages, message: "All packages fetched successfully" });
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

    if (!packageItem) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json({ package: packageItem, message: "Package fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


