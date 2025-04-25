import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { HumanMessage } from "@langchain/core/messages";

const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "mistral"
});

const getTestRecommendations = async (symptomsArray) => {
  try {
    const prompt = `
    Patient has these symptoms: ${symptomsArray.join(", ")}.
    Suggest diagnostic lab tests in the following JSON format:
    [
      { "test": "CBC", "reason": "Check for infection", "accuracy": 91 },
      { "test": "Thyroid Panel", "reason": "Evaluate thyroid function", "accuracy": 84 }
    ]
    Return only valid JSON.
    `;

    const response = await chatModel.invoke([new HumanMessage(prompt)]);
    return JSON.parse(response.content); 
  } catch (error) {
    console.error("LangChain/Ollama Error:", error.message);
    return [{ test: "Error", reason: "AI processing failed.", accuracy: 0 }];
  }
};

export default getTestRecommendations;
