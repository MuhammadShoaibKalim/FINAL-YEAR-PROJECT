// serverside/controllers/recommendation.controller.js
import getTestRecommendations from "../config/recommendation.js";

export const getTestRecommedation = async (req, res) => {
  const { symptoms } = req.body;

  if (!Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ error: "Symptoms must be a non-empty array" });
  }

  try {
    const result = await getTestRecommendations(symptoms);
    res.json({ success: true, recommendations: result });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ success: false, error: "AI processing failed." });
  }
};
