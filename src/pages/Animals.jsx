import React, { useEffect, useState } from "react";
import "./Animals.css";
import not from "../images/not.png";
import profile from "../images/user.png";
import AddLivestockModal from "../components/addlivestockmodal/AddLivestockModal";
import ViewLivestockModal from "../components/viewLivestockModal/ViewLivestockModal";
import EditLivestockModal from "../components/editLivestock/EditLivestockModal";
import ActionButton from "../components/actioButton/ActionButton";
import axios from "axios";

const Animals = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

 

  const performSearch = async () =>{
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    try {
      const response = await axios.post(
        `${baseUrl}/animal/filteranimal.php`,
        { userid: data.userid, query: searchTerm },
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      setAnimalData(response?.data?.animals);
      console.log(response);
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle error, e.g., show an error message to the user
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [livestock, setLivestock] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [healthStatus, setHealthStatus] = useState('');
  const handleFilterAnimalData = (event) => {
    setHealthStatus(event.target.value);
  };

  //edit view and delete code

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState(null);

  const handleOpenViewModal = (livestock) => {
    setSelectedLivestock(livestock);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedLivestock(null);
  };
  const handleOpenEditModal = (livestock) => {
    setSelectedLivestock(livestock);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLivestock(null);
  };

  const handleEditLivestock = (formData) => {
    // const updatedLivestock = livestock.map((item) =>
    //   item.id === selectedLivestock.id
    //     ? { ...item, ...Object.fromEntries(formData.entries()) }
    //     : item
    // );
    // setLivestock(updatedLivestock);
    handleGetAnimalData();
    handleCloseEditModal();
  };

  const handleDelete = async (id) => {
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    // setLivestock(livestock.filter((item) => item.id !== id));
    try {
      const response = await axios.post(
        `${baseUrl}/animal/deleteanimal.php`,
        { userid: data.userid, animalid: id },
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle error, e.g., show an error message to the user
    }
    handleGetAnimalData();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGetAnimalData = async () => {
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    try {
      const response = await axios.post(
        `${baseUrl}/animal/animals.php`,
        { userid: data.userid, status: healthStatus },
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      setAnimalData(response?.data?.animals);
      console.log(response);
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleAddLivestock = (newLivestock) => {
    setLivestock([...livestock, newLivestock]);
    handleGetAnimalData();
    handleCloseModal();
  };

  useEffect(() => {
    handleGetAnimalData();
  }, [healthStatus, baseUrl]);

  return (
    <div className="Animals">
      <div className="innerrightAnimalstop">
        <div className="Animalstopleft">
          <h2 className="Animalspage">
            Home {">"} <span className="blueAnimals"> Animals</span>
          </h2>
          <div className="animalhealthtop">
            <h1 className="Animalspagetop">Animals</h1>
            <div className="animalhealth">
              <select id="Health-Status" onChange={handleFilterAnimalData}>
                <option value="all">Health Status</option>
                <option value="all">All</option>
                <option value="healthy">Healthy</option>
                <option value="sick">Sick</option>
              </select>
              <div className="Animalsearchbar">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>

            <AddLivestockModal
              open={isModalOpen}
              handleClose={handleCloseModal}
              handleAdd={handleAddLivestock}
            />
            <ViewLivestockModal
              open={isViewModalOpen}
              handleClose={handleCloseViewModal}
              livestock={selectedLivestock}
            />
            <EditLivestockModal
              open={isEditModalOpen}
              handleClose={handleCloseEditModal}
              handleEdit={handleEditLivestock}
              livestock={selectedLivestock}
            />

          </div>
        </div>
        <div className="Animalstopright">
          <div className="add-btn-wrapper">
            <button
              onClick={handleOpenModal}
              type="button"
              className="add-btn"
            >
              add+
            </button>
          </div>
          {/* <img src={not} alt="notifications" /> */}
          <img src={profile} alt="profile"/> 
        </div>
      </div>
      <table className="animalstable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Specie</th>
            <th>Status</th>
            <th>Body Temperature</th>
            <th>Last Treatment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {animalData?.map((animal, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{animal?.specie}</td>
              <td>{animal?.status}</td>
              <td>{animal?.temperature}°C</td>
              <td>{animal?.last_treatment}</td>
              <td>
                <ActionButton
                  onView={() => handleOpenViewModal({ animal })}
                  onEdit={() => handleOpenEditModal({ animal })}
                  onDelete={() => handleDelete(animal?.animalid)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <label className="numbering">
        <h1>{"<"}</h1>
        <h2>1</h2>
        <h2>2</h2>
        <h2>3</h2>
        <h2>4</h2>
        <h2>5</h2>
        <h2>....</h2>
        <h2>100</h2>
        <h1>{">"}</h1>
      </label> */}
    </div>
  );
};

export default Animals;
