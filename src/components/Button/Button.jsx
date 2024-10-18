import React from "react";

function Button({ type = "submit", className = "", children, onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
