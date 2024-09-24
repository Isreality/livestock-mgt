import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
