import getTestRecommendations from "../langchain/langchain.js";

export const getTestRecommendation = async (req, res) => {
  const { description, symptoms } = req.body;

  if (
    (!description || typeof description !== "string" || description.trim().length < 10) &&
    (!Array.isArray(symptoms) || symptoms.length === 0)
  ) {
    return res.status(400).json({
      success: false,
      error: "Please provide either selected symptoms or a valid symptom description.",
    });
  }

  const inputText = description?.trim().length >= 10
    ? description
    : `Symptoms: ${symptoms.join(", ")}`;

  try {
    const result = await getTestRecommendations(inputText);
    res.json({ success: true, recommendations: result });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ success: false, error: "AI processing failed." });
  }
};
