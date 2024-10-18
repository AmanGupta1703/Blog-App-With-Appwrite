import React from "react";

function Input({ label, value, type, name, placeholder, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-sm"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Input;
