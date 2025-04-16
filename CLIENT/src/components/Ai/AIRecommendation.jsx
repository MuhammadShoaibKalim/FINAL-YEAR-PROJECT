import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SymptomInput from "./TestInput.jsx";
import TestResults from "./TestResults.jsx";
import { toast } from "react-toastify";
import { pipeline } from "@huggingface/transformers";

// Sample medical tests
const tests = [
  { id: "1", title: "Complete Blood Count (CBC)", description: "Analyzes red cells, white cells, and platelets." },
  { id: "2", title: "Lipid Profile", description: "Measures cholesterol levels and blood fats." },
  { id: "3", title: "Basic Metabolic Panel", description: "Checks kidney function, blood sugar, and electrolytes." },
  { id: "4", title: "Thyroid Function Tests", description: "Evaluates thyroid gland function." },
  { id: "5", title: "Liver Function Tests", description: "Assesses liver function and screens for diseases." },
  { id: "6", title: "Electrolyte Panel", description: "Checks sodium, potassium, and chloride levels." },
  { id: "7", title: "Renal Function Panel", description: "Evaluates kidney health and detects disorders." },
  { id: "8", title: "C-Reactive Protein (CRP)", description: "Detects inflammation in the body." },
  { id: "9", title: "Erythrocyte Sedimentation Rate (ESR)", description: "Measures inflammation levels." },
  { id: "10", title: "Hemoglobin A1C", description: "Assesses long-term blood sugar levels." },
  { id: "11", title: "Iron Studies", description: "Evaluates iron levels and anemia." },
  { id: "12", title: "Vitamin D Test", description: "Determines vitamin D levels for bone health." },
  { id: "13", title: "Vitamin B12 Test", description: "Checks B12 levels for nerve and blood cell health." },
  { id: "14", title: "Folic Acid Test", description: "Measures folate levels for red blood cell production." },
  { id: "15", title: "Prothrombin Time (PT)", description: "Assesses blood clotting function." },
  { id: "16", title: "Partial Thromboplastin Time (PTT)", description: "Evaluates clotting disorders." },
  { id: "17", title: "Blood Urea Nitrogen (BUN)", description: "Assesses kidney function." },
  { id: "18", title: "Creatinine Test", description: "Measures kidney efficiency." },
  { id: "19", title: "Cortisol Test", description: "Checks adrenal gland function." },
  { id: "20", title: "Testosterone Test", description: "Evaluates testosterone levels in the body." },
  { id: "21", title: "Estrogen Test", description: "Measures estrogen levels in females." },
  { id: "22", title: "Progesterone Test", description: "Determines progesterone levels in females." },
  { id: "23", title: "Insulin Test", description: "Assesses insulin production and resistance." },
  { id: "24", title: "C-Peptide Test", description: "Helps diagnose insulin-related disorders." },
  { id: "25", title: "DHEA-Sulfate Test", description: "Checks adrenal gland function." },
  { id: "26", title: "HIV Test", description: "Detects HIV infection." },
  { id: "27", title: "Hepatitis Panel", description: "Screens for hepatitis A, B, and C." },
  { id: "28", title: "Syphilis Test", description: "Detects syphilis infection." },
  { id: "29", title: "Chlamydia Test", description: "Screens for chlamydia infection." },
  { id: "30", title: "Gonorrhea Test", description: "Detects gonorrhea infection." },
  { id: "31", title: "Urinalysis", description: "Examines urine for infections and diseases." },
  { id: "32", title: "Pregnancy Test", description: "Detects pregnancy hormone (hCG)." },
  { id: "33", title: "Stool Test", description: "Identifies digestive tract issues and infections." },
  { id: "34", title: "Sputum Culture", description: "Detects respiratory infections." },
  { id: "35", title: "Skin Allergy Test", description: "Identifies allergic reactions." },
  { id: "36", title: "Food Allergy Test", description: "Detects food allergies." },
  { id: "37", title: "Bone Density Scan", description: "Measures bone strength and osteoporosis risk." },
  { id: "38", title: "X-Ray", description: "Visualizes bones and organs." },
  { id: "39", title: "MRI Scan", description: "Provides detailed images of body tissues." },
  { id: "40", title: "CT Scan", description: "Creates cross-sectional body images." },
  { id: "41", title: "Mammogram", description: "Screens for breast cancer." },
  { id: "42", title: "Pap Smear", description: "Screens for cervical cancer." },
  { id: "43", title: "PSA Test", description: "Detects prostate cancer risk." },
  { id: "44", title: "Colonoscopy", description: "Examines the colon for abnormalities." },
  { id: "45", title: "Endoscopy", description: "Visualizes the digestive tract." },
  { id: "46", title: "EKG (Electrocardiogram)", description: "Evaluates heart rhythm and function." },
  { id: "47", title: "Echocardiogram", description: "Assesses heart structure and function." },
  { id: "48", title: "Stress Test", description: "Measures heart performance under stress." },
  { id: "49", title: "Lung Function Test", description: "Evaluates lung capacity and airflow." },
  { id: "50", title: "Pulmonary Function Test", description: "Measures lung efficiency and disease presence." }
];
const AIRecommendation = () => {
  const [recommendedTests, setRecommendedTests] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleSymptomSubmit = async (symptoms) => {
    if (symptoms.length === 0) {
      toast.error("Please enter at least one symptom");
      return;
    }

    setIsAnalyzing(true);
    const symptomsText = symptoms.join(", ");
    console.log("Analyzing symptoms:", symptomsText);

    try {
      const classifier = await pipeline("zero-shot-classification", "cross-encoder/nli-distilroberta-base");

      const results = await Promise.all(
        tests.map(async (test) => {
          const hypotheses = [
            `These symptoms indicate a need for ${test.title}`,
            `${test.title} would help diagnose the condition causing these symptoms`,
            `These symptoms suggest conditions that ${test.title} can detect`
          ];

          const result = await classifier(symptomsText, hypotheses);
          console.log(`Result for ${test.title}:`, result);

          const positiveScore = (result.scores[0] + result.scores[1] + result.scores[2]) / 3;

          return {
            name: test.title,
            accuracy: Math.round(positiveScore * 100),
            description: test.description
          };
        })
      );

      console.log("All results:", results);

      const filteredResults = results
        .filter((r) => r.accuracy > 35)
        .sort((a, b) => b.accuracy - a.accuracy);

      setRecommendedTests(filteredResults);

      if (filteredResults.length === 0) {
        toast.info("No specific tests recommended. Please consult a doctor.");
      } else {
        toast.success(`Found ${filteredResults.length} relevant tests.`);
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("Failed to analyze symptoms. Try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 m">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">AI Test Recommendations</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Enter your symptoms, and our AI will analyze them to suggest medical tests.
        </p>
      </div>

      <div className="bg-bg-primary shadow-primary rounded-xl p-6 mb-8">
        <SymptomInput onSubmit={handleSymptomSubmit} />
      </div>

      {isAnalyzing ? (
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-bg-tertiary rounded-lg"></div>
          <div className="h-24 bg-bg-tertiary rounded-lg"></div>
          <div className="h-24 bg-bg-tertiary rounded-lg"></div>
        </div>
      ) : (
        recommendedTests.length > 0 && <TestResults tests={recommendedTests} />
      )}
    </div>
  );
};

export default AIRecommendation;
