import { predictTests } from "../models/ai.model.js";

export const getTestRecommendations = (req, res) => {
    try {
        let { symptoms } = req.body;

        if (!symptoms || !Array.isArray(symptoms) || symptoms.length < 2) {
            return res.status(400).json({ message: "Please provide at least two symptoms." });
        }

        const validSymptomRegex = /^[a-zA-Z\s]+$/;
        for (const symptom of symptoms) {
            if (!validSymptomRegex.test(symptom)) {
                return res.status(400).json({ message: "Invalid symptom format. Use only letters." });
            }
        }

        const recommendedTests = predictTests(symptoms);
        res.status(200).json({ success: true, recommendedTests });

    } catch (error) {
        res.status(500).json({ message: "Error in AI Test Recommendation", error: error.message });
    }
};
