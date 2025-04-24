import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const ReportCard = ({ reports, setReports }) => {
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setReports([...reports, { name: file.name, url: URL.createObjectURL(file) }]);
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setReports([...reports, { name: file.name, url: URL.createObjectURL(file) }]);
    }
  };

  const handleDeleteReport = (index) => {
    setReports(reports.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Reports</h3>

      {/* Reports List */}
      {reports.length > 0 ? (
        reports.map((report, index) => (
          <div key={index} className="flex items-center space-x-4 border-b py-3">
            <div className="bg-red-100 p-4 rounded-lg flex items-center">
              <span className="text-primary font-bold">PDF</span>
            </div>
            <p className="flex-1">{report.name}</p>
            <a href={report.url} download={report.name} className="bg-black text-white px-4 py-2 rounded-md">
              Download
            </a>
            <button onClick={() => handleDeleteReport(index)} className="text-red-600 hover:text-red-800 p-2">
              <FaTrash size={18} />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reports uploaded yet.</p>
      )}

      {/* Upload Reports Section */}
      <div
        className={`mt-6 border-dashed border-2 p-6 rounded-lg ${
          dragging ? "border-primary bg-gray-100" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <h3 className="text-xl font-semibold mb-4">Upload Reports</h3>
        <div className="flex space-x-4">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="bg-primary text-white px-4 py-2 rounded cursor-pointer">
            Choose File
          </label>
        </div>
        <p className="text-sm text-black mt-2">Drag and drop files here to upload.</p>
      </div>
    </div>
  );
};

export default ReportCard;
