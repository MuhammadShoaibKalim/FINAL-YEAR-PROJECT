import { useState } from "react";
import { FiX } from "react-icons/fi";

const SymptomInput = ({ onSubmit }) => {
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (index) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.length > 0) {
      onSubmit(symptoms);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSymptom();
    }
  };

  return (
    <div className="space-y-4">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a symptom..."
            className="flex-1 p-2 border rounded-lg focus:outline-none"
          />
          <button type="button" onClick={addSymptom} className="px-4 py-2 bg-primary text-white rounded-lg">
            Add
          </button>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg disabled:bg-gray-400" disabled={symptoms.length === 0}>
          Analyze Symptoms
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom, index) => (
          <div key={index} className="bg-white text-gray px-3 py-1 rounded-full flex items-center gap-2">
            <span>{symptom}</span>
            <button onClick={() => removeSymptom(index)} className="hover:text-red-600" aria-label="Remove symptom">
              <FiX size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomInput;
