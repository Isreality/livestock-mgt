import React, { useEffect, useState } from "react";
import "../fonts.css"
import not from "../images/not.png";
import profile from "../images/user.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import Sidebar from "../components/sideBar/SideBar";
import Header from "../components/head/Header";
import Heading from "../components/head/Heading";
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
    <div className="Animals font-custom">
      <div className="innerrightAnimalstop flex flex-row">
        <div className="bg-none md:bg-none lg:bg-primary"><Sidebar/></div>
        <div className="w-full"> 
          <div className="Animalstopleft">
            <div className="mb-4 items-center"><Header title="Animals" link="/animals"/></div>

            <div className="animalhealthtop flex flex-col md:flex-row justify-start md:justify-between md:items-center px-4 md:px-8">
              <div className="">
                <div className="mb-4"><Heading title="Animals"/></div>
              </div> 
              <div className="animalhealth flex flex-col md:flex-row gap-2">
                <div className="Animalsearchbar">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    className="p-4 text-sm text-black2 border border-f2 rounded w-full focus:bg-white focus:outline-primary"
                  />
                </div>

                <div className='relative'>
                  <select id="Health-Status" onChange={handleFilterAnimalData} className="block appearance-none w-full py-4 px-8 text-sm text-black2 bg-fa rounded focus:outline-primary cursor-pointer">
                    <option value="all">Health Status</option>
                    <option value="all">All</option>
                    <option value="healthy">Healthy</option>
                    <option value="sick">Sick</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                    <RiArrowDropDownLine className="h-6 w-6"/>
                  </div>
                </div>

                <div className="add-btn-wrapper">
                  <button
                    onClick={handleOpenModal}
                    type="button"
                    className="flex flex-row w-full gap-1 items-center px-6 py-4 bg-primary text-white text-sm text-center rounded-md"
                  >
                  Add+
                  </button>
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
            </div><br/>

            {/* Desktop Table */}
            <div className="mx-4 md:mx-8 hidden md:block">
              <table className=" min-w-full border-collapse border border-disable px-8 py-4 sm:overflow-x-auto">
                <thead className="bg-fa text-sm text-left">
                  <tr className="px-4 py-8">
                    <th className="px-6 py-6 text-black font-normal">ID</th>
                    <th className="px-4 py-6 text-black font-normal">Specie</th>
                    <th className="px-4 py-6 text-black font-normal">Status</th>
                    <th className="px-4 py-6 text-black font-normal">Body Temperature</th>
                    <th className="px-4 py-6 text-black font-normal">Last Treatment</th>
                    <th className="px-4 py-6 text-black font-normal">Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {animalData?.map((animal, index) => (
                    <tr key={index} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                      <td className="px-6 py-6">{index + 1}</td>
                      <td className="px-4 py-6">{animal?.specie}</td>
                      <td className="px-4 py-6">{animal?.status}</td>
                      <td className="px-4 py-6">{animal?.temperature}°C</td>
                      <td className="px-4 py-6">{animal?.last_treatment}</td>
                      <td className="px-6">
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
            </div>

            {/* Mobile Table */}
             <div className="block md:hidden w-full border border-disable">
                {animalData?.map((animal, index) => (
                    <div className="flex flex-row px-4 py-4 justify-between border-b border-disable items-center">
                      {/* Left side */}
                      <div className="flex flex-col text-sm text-left text-black2 font-normal gap-1">
                        <p className="">{animal?.specie}</p>
                        <p className="">{animal?.status}</p>
                      </div>

                      {/* Right side */}
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-right text-black2 font-normal gap-2">
                          <p className="">{animal?.temperature}°C</p>
                          <p className="">{animal?.last_treatment}</p>
                        </div>
                        <div>
                          <ActionButton
                          onView={() => handleOpenViewModal({ animal })}
                          onEdit={() => handleOpenEditModal({ animal })}
                          onDelete={() => handleDelete(animal?.animalid)}
                        />
                        </div>
                        
                      </div>
                    </div>
                    
                 ))}  
             </div>

          </div>

          

        </div>
        
        
      
      
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
    </div>
  );
};

export default Animals;
