import Lab from "../models/lab.model.js";
import Query from "../models/query.model.js";

export const submitQuery = async (req, res) => {
  try {
    const { name, email, subject, message, receiverType, labId } = req.body;

    if (!name || !email || !subject || !message || !receiverType) {
      return res.status(400).json({ message: "All required fields are missing." });
    }

    const newQuery = await Query.create({
      name,
      email,
      subject,
      message,
      receiverType,
      labId: receiverType === "labadmin" ? labId : undefined,
      userId: req.user?.id || null,
      status: "unviewed"
    });

    res.status(201).json({ success: true, message: "Query submitted successfully", query: newQuery });
  } catch (error) {
    res.status(500).json({ message: "Error submitting query", error: error.message });
  }
};


export const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find({}, "name _id");
    res.status(200).json({ success: true, labs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching labs", error: error.message });
  }
};


export const getAllQueries = async (req, res) => {
    try {
      const queries = await Query.find().populate({
        path: "userId",
        select: "firstName lastName email ",
      });
      
      res.status(200).json({ success: true, queries });
    } catch (error) {
      console.error("Error fetching queries:", error);
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
      const userId = req.user?.id || null;
      const queries = await Query.find({ userId: userId }).populate("userId", "firstName lastName email");
      res.status(200).json({ success: true, queries });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user queries", error: error.message });
    }
};
