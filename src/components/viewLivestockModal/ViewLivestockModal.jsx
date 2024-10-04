import React from "react";
import "./view-livestock-modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewLivestockModal = ({ open, handleClose, livestock }) => {
  if (!open) return null;
  // console.log(livestock.animal?.id, "hehhe" );
  if (livestock?.animal?.temperature >= 32 && livestock?.animal?.temperature <= 40) {
    toast.success("Your livestock is healthy");
  } else {
    toast.error("You need to book an appointment for this livestock");
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <h2 className="text-2xl text-primary text-center font-semibold mb-4">View Livestock Details</h2>
        <div className="livestock-details flex flex-col gap-5 text-left text-lg">
          <div className="flex items-center justify-between">
            <p>ID</p> 
            {livestock.animal?.id}
          </div>
          <hr/>

          <div className="flex items-center justify-between">
            <p>Specie</p> 
            {livestock.animal?.specie}
          </div>
          <hr/>

          <div className="flex items-center justify-between">
            <p>Last Treatment</p> 
            {livestock.animal?.last_treatment}
          </div>
          <hr/>

          <div className="flex items-center justify-between">
            <p>Status</p> 
            {livestock.animal?.status}
          </div>
          <hr/>

          <div className="flex items-center justify-between">
            <p>Disease</p> 
            {livestock.animal?.disease}
          </div>
          <hr/>

          <div className="flex items-center justify-between">
            <p>Body Temperature</p> 
            {livestock?.animal?.temperature}°C
          </div>
          <hr/>
        </div>
        <button className="info-button">Disease Information</button>
      </div>
    </div>
  );
};

export default ViewLivestockModal;
