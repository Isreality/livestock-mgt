import React, { useState, useRef, useEffect } from "react";
import "./action-button.css";

const ActionButton = ({ onView, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="action-button" ref={buttonRef}>
      <button onClick={handleToggle} className="three-dot-button">
        ⋮
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={onView} className="dropdown-item">
            View
          </button>
          <button onClick={onEdit} className="dropdown-item">
            Edit
          </button>
          <button onClick={onDelete} className="dropdown-item">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
