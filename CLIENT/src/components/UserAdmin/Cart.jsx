import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiArrowRight, FiShield } from "react-icons/fi";
import { FaVial, FaMicroscope, FaClinicMedical } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import {
  removeItem,
  updateQuantity,
  setCart,
  deleteItem
} from "../../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleNavigate = () => {
    setIsLoading(true);
    navigate("/place-order");
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setCart(data.cartItems));
        }
      } catch (err) {
        console.error("Fetch cart failed:", err);
      }
    };

    if (user) fetchCart();
  }, [dispatch, user]);

  const handleQuantityChange = async (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQty = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    
    try {
      const res = await fetch(`/api/cart/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          testOrPackageId: id,
          quantity: newQty,
          type: item.type || "Test",
          name: item.name,
          price: item.price,
          labId: item.labId
        }),
      });

      const data = await res.json();
      if (data.success) {
        dispatch(updateQuantity({ _id: id, quantity: newQty }));
      } else {
        toast.error(data.message || "Failed to update quantity.");
      }
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error("Operation failed.");
    }
  };

  const handleRemove = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("authToken")}` 
        },
      });
      
      const data = await res.json();
      if (data.success) {
        dispatch(deleteItem(id));
        toast.success("Item removed from cart.");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("System failure.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] p-16 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 text-4xl mx-auto shadow-inner">
            <FiShoppingCart />
        </div>
        <div className="space-y-3">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic">Your <span className="text-primary">Cart is Empty.</span></h2>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.3em]">No tests have been added to your cart yet.</p>
        </div>
        <Link to="/all-tests-packages" className="inline-block bg-primary text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:bg-slate-900 transition-all active:scale-95">
            Browse All Tests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col xl:flex-row gap-12">
        <div className="flex-grow space-y-6">
            <div className="flex items-center justify-between px-2">
                <div>
                   <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic">My <span className="text-primary NOT-italic">Cart.</span></h2>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Items in your cart: {cartItems.length}</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 italic text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <FiShield className="text-primary" /> Secure Checkout
                </div>
            </div>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item._id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-primary/30 transition-all flex flex-col sm:flex-row justify-between items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-center gap-6 w-full">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary text-xl border border-slate-100 shrink-0 shadow-inner group-hover:bg-white transition-all">
                                {item.type === "Package" ? <FaMicroscope /> : <FaVial />}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.type || "Test"}</p>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none group-hover:text-primary transition-colors">{item.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 italic flex items-center gap-2">
                                    <FaClinicMedical className="text-[8px]" /> {item.labName || "Partner Lab"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-10 w-full justify-between sm:justify-end">
                            <div className="flex items-center bg-slate-50 border border-slate-100 p-2 rounded-2xl space-x-1 shrink-0">
                                <button
                                    onClick={() => handleQuantityChange(item._id, "dec")}
                                    className="w-10 h-10 rounded-xl text-slate-400 hover:bg-white hover:text-primary hover:shadow-md transition-all flex items-center justify-center disabled:opacity-30"
                                    disabled={isDeleting || item.quantity <= 1}
                                >
                                    <FiMinus />
                                </button>
                                <span className="w-8 text-center text-[13px] font-black text-slate-800">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item._id, "inc")}
                                    className="w-10 h-10 rounded-xl text-slate-400 hover:bg-white hover:text-primary hover:shadow-md transition-all flex items-center justify-center"
                                    disabled={isDeleting}
                                >
                                    <FiPlus />
                                </button>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</p>
                                <p className="text-xl font-black text-slate-800 tracking-tighter leading-none italic">
                                    PKR {(item.price * item.quantity).toFixed(0)}
                                </p>
                            </div>

                            <button
                                onClick={() => handleRemove(item._id)}
                                className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm hover:shadow-rose-200 active:scale-90 shrink-0"
                                disabled={isDeleting}
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="w-full xl:w-[400px] shrink-0">
            <div className="bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-300 text-white space-y-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 relative z-10">Order Summary</h3>
                
                <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <span>Cart Total</span>
                        <span>PKR {total.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <span>Discount</span>
                        <span className="text-emerald-500 font-black">- PKR 0</span>
                    </div>
                    <div className="h-px bg-white/10 my-8 opacity-50"></div>
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Total Payable</p>
                            <p className="text-4xl font-black tracking-tighter italic">PKR {total.toFixed(0)}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-10 relative z-10">
                    <button
                        onClick={handleNavigate}
                        disabled={isLoading || isDeleting}
                        className="w-full bg-primary hover:bg-white hover:text-slate-900 text-white py-6 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? "LOADING..." : "Place Your Order"}
                        <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
                    </button>
                    <p className="text-center text-[9px] font-black text-slate-600 uppercase tracking-widest italic pt-2">
                        100% Secure Transaction
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
