import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { HumanMessage } from "@langchain/core/messages";

const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434", // Make sure this URL is correct
  model: "mistral",
});

const getTestRecommendations = async (description) => {
  try {
    const prompt = `
    You are a clinical assistant.
    
    Patient says: "${description}"
    
    Based on these symptoms, suggest 2-5 relevant diagnostic lab tests.
    
    Only respond in **this exact JSON format** — do not include any other text:
    [
      { "test": "Test Name", "reason": "Short medical reason" }
    ]
    
    Example:
    [
      { "test": "CBC", "reason": "To check for infection or anemia" },
      { "test": "MRI", "reason": "To investigate neurological symptoms" }
    ]
    
    Now respond with your recommendations:
    `;
    

    const response = await chatModel.invoke([new HumanMessage(prompt)]);

    // Check if response.content is valid JSON
    try {
      const recommendations = JSON.parse(response.content);
      
      // Validate if it's the expected structure (an array of objects)
      if (Array.isArray(recommendations)) {
        return recommendations;
      } else {
        throw new Error("Invalid response format from AI.");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError.message);
      return [
        { test: "No Recommendation", reason: "AI failed to parse your input properly." }
      ];
    }
  } catch (error) {
    console.error("LangChain/Ollama Error:", error.message);
    return [
      { test: "No Recommendation", reason: "AI processing failed." }
    ];
  }
};

export default getTestRecommendations;
