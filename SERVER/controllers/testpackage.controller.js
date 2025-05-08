import mongoose from "mongoose";
import { Test, Package } from "../models/testpackage.model.js";
import Lab from "../models/lab.model.js";


// ------------------ TEST CONTROLLERS 
export const createTest = async (req, res) => {
  try {
    const { name, description, price, discount } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ error: "Name, price, and description are required." });
    }

    const lab = req.user.assignedLab || req.user.labId || req.user.lab;

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
    console.error("Error in createTest:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
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
export const getAllTests = async (req, res) => {
  try {
    // const tests = await Test.find()
    //   .populate("createdBy", "name email")
    //   .populate("lab", "name location");
    const tests = await Test.find().select("name price discount lab bookedCount rating type");
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
export const addTestReview = async (req, res) => {
  const { rating, review } = req.body;
  const { id } = req.params;

  const test = await Test.findById(id);
  if (!test) return res.status(404).json({ error: "Test not found" });

  test.feedbacks.push({ userId: req.user.id, rating, review });

  const total = test.feedbacks.reduce((acc, f) => acc + f.rating, 0);
  test.rating = total / test.feedbacks.length;

  await test.save();
  res.status(200).json({ success: true, message: "Review added." });
};




// ------------------ PACKAGE CONTROLLERS 
export const createPackage = async (req, res) => {
  try {
    const { name, description, price, tests, discount } = req.body;

    if (!name || !price || !description || !tests || !Array.isArray(tests) || tests.length === 0) {
      return res.status(400).json({ error: "Name, price, description, and at least one test are required." });
    }

    const lab = req.user.assignedLab || req.user.labId || req.user.lab;

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
    console.error("Error in createPackage:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
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
    const packages = await Package.find().select("name price discount lab bookedCount rating description type");


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
export const addPackageReview = async (req, res) => {
  const { rating, review } = req.body;
  const { id } = req.params;

  const pkg = await Package.findById(id);
  if (!pkg) return res.status(404).json({ error: "Package not found" });

  pkg.feedbacks.push({ userId: req.user.id, rating, review });

  const total = pkg.feedbacks.reduce((acc, f) => acc + f.rating, 0);
  pkg.rating = total / pkg.feedbacks.length;

  await pkg.save();
  res.status(200).json({ success: true, message: "Review added." });
};
export const addFeedback = async (req, res) => {
  try {
    const { testOrPackageId, type, rating, comment } = req.body;
    if (!testOrPackageId || !type || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const feedback = {
      userId: req.user.id,
      rating,
      comment,
      date: new Date(),
    };

    let itemModel = type === "Test" ? Test : Package;

    const item = await itemModel.findById(testOrPackageId);
    if (!item) return res.status(404).json({ message: `${type} not found` });

    item.feedbacks.push(feedback);

    // Recalculate average rating
    const totalRatings = item.feedbacks.reduce((acc, f) => acc + f.rating, 0);
    item.rating = totalRatings / item.feedbacks.length;

    await item.save();

    res.status(200).json({ message: "Feedback submitted" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllPublicTests = async (req, res) => {
  try {
    const tests = await Test.find().select("name price discount lab bookedCount rating type").populate("lab", "name location");
    res.status(200).json({ success: true, tests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllPublicPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .select("name price discount lab bookedCount rating description type")
      .populate("lab", "name location");
    
    res.status(200).json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
