import React from "react";
import "./success-modal.css";

const SuccessModal = ({ isOpen, onProceed }) => {
  return (
    isOpen && (
      <div className="success-modal">
        <div className="success-modal-content">
          <h2>Congratulations</h2>
          <div className="check-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="32" fill="#007BFF" />
              <path
                d="M48 18L26 40L16 30"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Your account has been created</p>
          <button className="proceed-btn" onClick={onProceed}>
            Proceed
          </button>
        </div>
      </div>
    )
  );
};

export default SuccessModal;
