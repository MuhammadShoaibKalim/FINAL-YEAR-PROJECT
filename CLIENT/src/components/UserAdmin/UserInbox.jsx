import React, { useEffect, useState } from "react";

const UserInbox = () => {
  const [queries, setQueries] = useState([]);
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch(`/api/query/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) setQueries(data.queries);
      } catch (error) {
        console.error("Error fetching user queries:", error);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Your Submitted Queries</h2>
      {queries.length === 0 ? (
        <p>No queries submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Response</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{q.subject}</td>
                  <td className="px-4 py-2">{q.message}</td>
                  <td className="px-4 py-2">
                    {q.response ? q.response : <span className="italic text-gray-400">No response yet</span>}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    <span className={`text-xs px-2 py-1 rounded-full
                      ${q.status === "unviewed" && "bg-yellow-100 text-yellow-700"}
                      ${q.status === "viewed" && "bg-blue-100 text-blue-700"}
                      ${q.status === "responded" && "bg-green-100 text-green-700"}
                    `}>
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserInbox;
