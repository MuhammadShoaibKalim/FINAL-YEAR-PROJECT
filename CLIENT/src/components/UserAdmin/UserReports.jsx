import React, { useEffect, useState } from "react";
import { FaDownload, FaFileAlt } from "react-icons/fa";

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/results/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setReports(data.reports);
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <p className="text-gray-600">No reports available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="p-4 border rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold text-lg">
                  {report.testId?.name || report.packageId?.name || "Unnamed Report"}
                </h4>
                <p className="text-sm text-gray-500">Status: {report.status}</p>
                <p className="text-sm text-gray-500">Uploaded: {new Date(report.createdAt).toLocaleDateString()}</p>
              </div>
              <a
                href={report.resultFile}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-dark"
              >
                <FaDownload /> Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReports;
