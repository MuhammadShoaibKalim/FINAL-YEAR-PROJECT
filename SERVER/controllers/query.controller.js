import Query from "../models/query.model.js";

export const submitQuery = async (req, res) => {
    try {
      const { userId, subject, message } = req.body;
      if (!userId || !subject || !message) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const newQuery = await Query.create({ userId, subject, message });
      res.status(201).json({ success: true, message: "Query submitted successfully", query: newQuery });
    } catch (error) {
      res.status(500).json({ message: "Error submitting query", error: error.message });
    }
  };
export const getAllQueries = async (req, res) => {
    try {
      const queries = await Query.find().populate("userId", "firstName lastName email");
      res.status(200).json({ success: true, queries });
    } catch (error) {
      res.status(500).json({ message: "Error fetching queries", error: error.message });
    }
  };
export const markQueryAsViewed = async (req, res) => {
    try {
      const query = await Query.findByIdAndUpdate(req.params.id, { status: "viewed" }, { new: true });
      if (!query) return res.status(404).json({ message: "Query not found" });
      res.status(200).json({ success: true, message: "Query marked as viewed", query });
    } catch (error) {
      res.status(500).json({ message: "Error updating query", error: error.message });
    }
  };
export const deleteQuery = async (req, res) => {
    try {
      await Query.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "Query deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting query", error: error.message });
    }
  };
export const respondToQuery = async (req, res) => {
    try {
      const { response } = req.body;
      const query = await Query.findByIdAndUpdate(
        req.params.id,
        { response, status: "responded" },
        { new: true }
      );
  
      if (!query) return res.status(404).json({ message: "Query not found" });
  
      res.status(200).json({ success: true, message: "Response sent successfully", query });
    } catch (error) {
      res.status(500).json({ message: "Error responding to query", error: error.message });
    }
  };
  export const getUserQueries = async (req, res) => {
    try {
      const queries = await Query.find({ userId: req.params.userId }).populate("userId", "firstName lastName email");
      res.status(200).json({ success: true, queries });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user queries", error: error.message });
    }
  };
  
