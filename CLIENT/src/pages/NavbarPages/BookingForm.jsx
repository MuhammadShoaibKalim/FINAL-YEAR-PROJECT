import { useState } from "react";

const Input = ({ type, placeholder, value, onChange, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

const Button = ({ children, onClick, type = "button", variant = "default" }) => {
  const baseClass =
    "px-4 py-2 font-semibold rounded-md transition duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${variants[variant]}`}>
      {children}
    </button>
  );
};

const BookingForm = ({ serviceName, onClose }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Confirmed for:", serviceName, "by", name, contact);
    onClose();
  };

  return (
    <div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book {serviceName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="Your Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Confirm Booking</Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
