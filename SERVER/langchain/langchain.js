import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const getTestRecommendations = async (description) => {
  try {
    const chatCompletion = await client.chatCompletion({
      provider: "hf-inference",
      model: "HuggingFaceTB/SmolLM3-3B",
      messages: [
        {
          role: "system",
          content: `You are a clinical assistant. Suggest 2-4 diagnostic tests based on symptoms.

Rules:
1. Output ONLY a JSON array
2. No explanations, no thinking, no markdown
3. Format: [{"test": "Test Name", "reason": "Brief reason"}]
4. Be concise`
        },
        {
          role: "user",
          content: `Symptoms: ${description}

Output JSON array:`
        }
      ],
      max_tokens: 300,
      temperature: 0.1
    });

    const text = chatCompletion.choices[0].message.content;
    console.log("Raw AI response:", text);

    // Try multiple parsing strategies
    let recommendations = null;

    // Strategy 1: Direct JSON parse
    try {
      recommendations = JSON.parse(text);
      if (Array.isArray(recommendations)) return recommendations;
    } catch (e) {
      console.log("Direct parse failed, trying extraction...");
    }

    // Strategy 2: Extract from markdown code blocks
    let jsonString = text;
    if (text.includes("```json")) {
      jsonString = text.split("```json")[1].split("```")[0].trim();
    } else if (text.includes("```")) {
      jsonString = text.split("```")[1].split("```")[0].trim();
    }

    // Strategy 3: Find array brackets
    const jsonStart = jsonString.indexOf("[");
    const jsonEnd = jsonString.lastIndexOf("]") + 1;

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      jsonString = jsonString.slice(jsonStart, jsonEnd);
      try {
        recommendations = JSON.parse(jsonString);
        if (Array.isArray(recommendations)) return recommendations;
      } catch (e) {
        console.log("Array extraction failed");
      }
    }

    // Strategy 4: Extract individual objects and build array
    const objectMatches = text.match(/\{[^{}]*\}/g);
    if (objectMatches) {
      try {
        const objects = objectMatches.map(obj => JSON.parse(obj));
        if (objects.length > 0) return objects;
      } catch (e) {
        console.log("Object extraction failed");
      }
    }

    // Strategy 5: Regex extraction for test names
    console.log("All parsing failed, using regex fallback");
    const testMatches = text.match(/(?:test|name)["':\s]+([^",\n]+)/gi);
    const reasonMatches = text.match(/(?:reason|for)["':\s]+([^",\n]+)/gi);

    if (testMatches && testMatches.length > 0) {
      return testMatches.slice(0, 4).map((test, i) => ({
        test: test.replace(/(?:test|name)["':\s]+/i, "").trim(),
        reason: reasonMatches && reasonMatches[i]
          ? reasonMatches[i].replace(/(?:reason|for)["':\s]+/i, "").trim()
          : "Recommended based on symptoms"
      }));
    }

    throw new Error("Could not parse any valid recommendations");

  } catch (error) {
    console.error("HF Error:", error.message);

    // Final fallback with generic recommendations based on keywords
    const symptoms = description.toLowerCase();
    const fallbackRecommendations = [];

    if (symptoms.includes("fever") || symptoms.includes("chill")) {
      fallbackRecommendations.push({ test: "CBC", reason: "Check for infection or inflammation" });
      fallbackRecommendations.push({ test: "Blood Culture", reason: "Identify bacterial infection" });
    }
    if (symptoms.includes("headache") || symptoms.includes("migraine")) {
      fallbackRecommendations.push({ test: "CT Scan", reason: "Rule out neurological issues" });
    }
    if (symptoms.includes("weak") || symptoms.includes("fatigue")) {
      fallbackRecommendations.push({ test: "Thyroid Panel", reason: "Check thyroid function" });
      fallbackRecommendations.push({ test: "Iron Studies", reason: "Check for anemia" });
    }
    if (symptoms.includes("chest") || symptoms.includes("breath")) {
      fallbackRecommendations.push({ test: "Chest X-Ray", reason: "Check for respiratory issues" });
    }
    if (symptoms.includes("stomach") || symptoms.includes("abdominal")) {
      fallbackRecommendations.push({ test: "Ultrasound", reason: "Check abdominal organs" });
    }

    if (fallbackRecommendations.length === 0) {
      fallbackRecommendations.push({
        test: "General Checkup",
        reason: "Consult doctor for proper evaluation"
      });
    }

    return fallbackRecommendations;
  }
};

export default getTestRecommendations;












// import { InferenceClient } from "@huggingface/inference";

// const client = new InferenceClient(process.env.HF_TOKEN);

// const getTestRecommendations = async (description) => {
//   try {
//     const prompt = `
// You are a clinical assistant.
// Only suggest medically appropriate diagnostic tests.

// Patient says: "${description}"

// Respond ONLY in valid JSON:
// [
//   { "test": "Test Name", "reason": "Short medical reason" }
// ]
// `;

//     // Use textGeneration with hf-inference provider
//     const response = await client.textGeneration({
//       accessToken: process.env.HF_TOKEN,
//       model: "mistralai/Mistral-7B-Instruct-v0.2",
//       provider: "together",
//       inputs: prompt,
//       parameters: {
//         max_new_tokens: 250,
//         temperature: 0.1,
//       },
//     });

//     const text = response.generated_text.trim();

//     const jsonStart = text.indexOf("[");
//     const jsonEnd = text.lastIndexOf("]") + 1;
//     const jsonString = text.slice(jsonStart, jsonEnd);

//     return JSON.parse(jsonString);

//   } catch (error) {
//     console.error("HF Error:", error.message || error);
//     return [
//       { test: "No Recommendation", reason: "AI processing failed." }
//     ];
//   }
// };

// export default getTestRecommendations;