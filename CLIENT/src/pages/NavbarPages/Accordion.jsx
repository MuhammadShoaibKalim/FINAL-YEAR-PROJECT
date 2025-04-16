import React from "react";

const Accordion = ({ title, children, isOpen, toggle }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <button
        onClick={toggle}
        className="w-full text-left px-6 py-4 font-semibold text-primary flex justify-between items-center"
      >
        {title}
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="px-6 py-4 text-gray-700">{children}</div>}
    </div>
  );
};

export default Accordion;
