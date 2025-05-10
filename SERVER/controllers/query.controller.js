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
      userId: req.user._id,
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
      { 
        response,
        status: "responded",
        respondedBy: req.user._id,
      },
      { new: true }
    ).populate("labId", "name"); 

    if (!query) return res.status(404).json({ message: "Query not found" });

    if (query.receiverType === "labadmin") {

    }

    res.status(200).json({ success: true, message: "Response sent successfully", query });
  } catch (error) {
    res.status(500).json({ message: "Error responding to query", error: error.message });
  }
};
export const getUserQueries = async (req, res) => {
  try {
    const userId = req.user._id;
    const queries = await Query.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "labId",
        select: "name"
      })
      .select("name email subject message response status createdAt updatedAt receiverType labId")
      .lean();

    const queriesWithResponder = queries.map(query => {
      let responder = "Support Team";
      if (query.receiverType === "labadmin" && query.labId) {
        responder = query.labId.name + " (Lab Admin)";
      }
      return { ...query, responder };
    });

    res.status(200).json({ success: true, queries: queriesWithResponder });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user queries", error: error.message });
  }
};
// export const getInboxMessages = async (req, res) => {
//   try {
//     const userId = req.user._id; 

//     const inboxMessages = await Query.find({ userId: userId })
//       .sort({ createdAt: -1 })
//       .select("name email subject message response status createdAt updatedAt")
//       .lean();

//     res.status(200).json({ success: true, inboxMessages });
//   } catch (error) {
//     console.error("Error fetching inbox messages:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch inbox messages." });
//   }
// };
export const getInboxMessages = async (req, res) => {
  try {
    const user = req.user;
    let queryConditions;

    if (user.role === "labadmin") {

      queryConditions = {
        $or: [
          { receiverType: "labadmin", labId: user.labId },
          { userId: user._id, response: { $exists: true } }
        ]
      };
    } else if (user.role === "user") {

      queryConditions = { userId: user._id };
    } else {
      queryConditions = { receiverType: "support" };
    }

    const messages = await Query.find(queryConditions)
      .sort({ createdAt: -1 })
      .populate({
        path: "userId labId",
        select: "name email"
      });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching inbox messages:", error);
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
};



export const respondToMessage = async (req, res) => {
  const { messageId } = req.params;
  const { response } = req.body;
  
  try {
    const query = await Query.findByIdAndUpdate(
      messageId,
      { response, status: "responded" },
      { new: true }
    );
    if (!query) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, query });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const deleted = await Query.findByIdAndDelete(messageId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const markMessageViewed = async (req, res) => {
  const { messageId } = req.params;

  try {
    const updated = await Query.findByIdAndUpdate(
      messageId,
      { status: "viewed" },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const contactSuperAdmin = async (req, res) => {
  const { name, email, subject, description, userId } = req.body;

  if (!name || !email || !subject || !description) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newQuery = new Query({
      name,
      email,
      subject,
      message: description,
      userId: userId || null,
    });

    await newQuery.save();
    res.status(201).json({ success: true, message: "Message sent to Super Admin" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};