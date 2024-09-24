import React, { useState, useEffect } from "react";
import "./edit-livestock.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditLivestockModal = ({ open, handleClose, handleEdit, livestock }) => {
  const data = JSON.parse(sessionStorage.getItem("tokenObj"));
  const animalid = livestock?.animal?.animalid;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [formValues, setFormValues] = useState({
    id: data.userid,
    specie: livestock?.animal?.specie || "",
    status: livestock?.animal?.status || "",
    lastTreatmentDate: livestock?.animal?.status || "",
    disease: livestock?.animal?.disease || "",
    bodyTemperature: livestock?.animal?.temperature || "",
    imageUrl: "",
  });

  useEffect(() => {
    if (livestock?.animal?.animalid) {
      setFormValues({
        id: data.userid,
        specie: livestock.animal.specie || '',
        status: livestock.animal.status || '',
        lastTreatmentDate: livestock.animal.lastTreatmentDate || '',
        disease: livestock.animal.disease || '',
        bodyTemperature: livestock.animal.temperature || '',
        imageUrl: livestock.animal.imageUrl || ''
      });
    }
  }, [livestock]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userid", formValues.id);
    formData.append("animalid", animalid);
    formData.append("specie", formValues.specie);
    formData.append("status", formValues.status);
    formData.append("last-treatment", formValues.lastTreatmentDate);
    formData.append("disease", formValues.disease);
    formData.append("body-temperature", formValues.bodyTemperature);

    // const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    try {
      const response = await axios.post(
        `${baseUrl}/animal/editanimal.php`,
        formData,
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      if (formValues.bodyTemperature >= 32 && formValues.bodyTemperature <= 40) {
        toast.success("Your livestock is healthy");
      } else {
        toast.error("You need to book an appointment for this livestock");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle error, e.g., show an error message to the user
    }
    handleEdit(formData);
    handleClose();
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <h2>Edit Livestock</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Specie</label>
            <input
              type="text"
              name="specie"
              value={formValues.specie}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <div className="status-options">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Healthy"
                  checked={formValues.status === "Healthy"}
                  onChange={handleInputChange}
                />
                Healthy
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Sick"
                  checked={formValues.status === "Sick"}
                  onChange={handleInputChange}
                />
                Sick
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Weak"
                  checked={formValues.status === "Weak"}
                  onChange={handleInputChange}
                />
                Weak
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Date of Last Treatment</label>
            <input
              type="date"
              name="lastTreatmentDate"
              value={formValues.lastTreatmentDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Disease</label>
            <input
              type="text"
              name="disease"
              value={formValues.disease}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Body Temperature</label>
            <input
              type="number"
              name="bodyTemperature"
              value={formValues.bodyTemperature}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="add-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLivestockModal;
