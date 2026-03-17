import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddCustomTest from "./AddCustomTest";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaFlask, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTag, FaBookmark } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

export default function OfferedTests() {
  const [showAddCustomTest, setShowAddCustomTest] = useState(false);
  const [tests, setTests] = useState([]);
  const [editingTestId, setEditingTestId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", discount: "" });
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth?.user);

  const fetchTestsAndPackages = async () => {
    try {
      const res = await fetch("/api/labadmin/labdashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const json = await res.json();
      if (json.success) {
        setTests(json.data.testPackages || []);
      } else {
        toast.error(json.message || "Failed to load facility catalog");
      }
    } catch (error) {
      console.error("Error fetching dashboard tests/packages", error);
      toast.error("Telemetry sync error: Catalog unreachable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestsAndPackages();
  }, [showAddCustomTest]);

  const handleEdit = (test) => {
    setEditingTestId(test._id);
    setEditForm({
      name: test.name,
      price: test.price,
      discount: test.discount || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (test) => {
    try {
      const payload = {
        name: editForm.name,
        price: editForm.price,
        discount: editForm.discount,
      };

      const endpoint =
        test.type === "Test"
          ? `/api/tests/update-test/${test._id}`
          : `/api/tests/update-package/${test._id}`;

      await axios.put(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      fetchTestsAndPackages();
      setEditingTestId(null);
      toast.success("Protocol updated successfully");
    } catch (error) {
      console.error("Error updating", error);
      toast.error("Protocol update failure");
    }
  };

  const handleDelete = async (test) => {
    if (!window.confirm("CRITICAL: Purge this test protocol from the active catalog?")) return;
    
    try {
      const endpoint =
        test.type === "Test"
          ? `/api/tests/delete-test/${test._id}`
          : `/api/tests/delete-package/${test._id}`;

      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchTestsAndPackages();
      toast.success("Protocol purged from catalog");
    } catch (error) {
      console.error("Error deleting", error);
      toast.error("Protocol purge fault");
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-[400px]">
      <ImSpinner2 className="text-primary text-4xl animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Facility Catalog</p>
    </div>
  );

  return (
    <>
      {showAddCustomTest ? (
        <AddCustomTest onClose={() => setShowAddCustomTest(false)} />
      ) : (
        <div className="space-y-10 animate-in fade-in duration-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
               <div className="inline-block px-4 py-1 bg-primary/5 rounded-full border border-primary/10">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Resource Management</p>
               </div>
               <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Test <span className="italic text-primary">Catalog.</span></h2>
               <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Manage Active Diagnostic Protocols & Pricing</p>
            </div>
            <button
              onClick={() => setShowAddCustomTest(true)}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-slate-200"
            >
              <FaPlus /> Initialize New Protocol
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Protocol Identity</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Classification</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Valuation (PKR)</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Discount Yield</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Booking Freq</th>
                    <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Action Hub</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-bold text-slate-700">
                  {tests.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        {editingTestId === item._id ? (
                          <div className="flex items-center bg-white border-2 border-primary rounded-xl px-4 py-2">
                            <input
                              type="text"
                              name="name"
                              value={editForm.name}
                              onChange={handleEditChange}
                              className="bg-transparent outline-none w-full text-xs font-black uppercase tracking-tight"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                               <FaFlask className="text-xs" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        )}
                      </td>

                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest rounded-lg text-slate-400">
                          {item.type}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        {editingTestId === item._id ? (
                          <div className="flex items-center bg-white border-2 border-primary rounded-xl px-4 py-2 w-32">
                            <input
                              type="number"
                              name="price"
                              value={editForm.price}
                              onChange={handleEditChange}
                              className="bg-transparent outline-none w-full text-xs font-black"
                            />
                          </div>
                        ) : (
                          <span className="font-black italic text-primary">PKR {item.price}</span>
                        )}
                      </td>

                      <td className="px-8 py-6">
                        {editingTestId === item._id ? (
                          <div className="flex items-center bg-white border-2 border-primary rounded-xl px-4 py-2 w-24">
                            <input
                              type="number"
                              name="discount"
                              value={editForm.discount}
                              onChange={handleEditChange}
                              className="bg-transparent outline-none w-full text-xs font-black"
                              min="0"
                              max="100"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                             <FaTag className="text-[10px] text-emerald-400" />
                             <span className={item.discount ? "text-emerald-600" : "text-slate-300"}>{item.discount ? `${item.discount}%` : "0%"}</span>
                          </div>
                        )}
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <FaBookmark className="text-[10px] text-slate-300" />
                           <span className="text-slate-500 font-black">{item.bookedCount || "0"}</span>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          {editingTestId === item._id ? (
                            <button
                              onClick={() => handleSaveEdit(item)}
                              className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                              <FaCheckCircle />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl rounded-xl transition-all"
                            >
                              <FaEdit />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-3 bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100 hover:shadow-xl rounded-xl transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tests.length === 0 && (
                <div className="p-20 text-center space-y-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                      <FaFlask className="text-2xl" />
                   </div>
                   <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Facility Catalog Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
