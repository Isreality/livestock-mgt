import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../fonts.css"
import dashboardicon from "../images/dashboard.png";
import animalicon from "../images/animal.png";
import settingicon from "../images/settings.png";
import logouticon from "../images/logout.png";
import dogpaw from "../images/dogpaw.png";
import not from "../images/not.png";
import profile from "../images/user.png";
import chart from "../images/chart1.png";
import chart1 from "../images/chart2.png";
import appointmenticon from "../images/appointment.png";
import Animals from "./Animals";
import Appointments from "./Appointments.js";
import Settings from "./Settings.jsx";
import { RxCaretRight } from "react-icons/rx";
import axios from "axios";
import Sidebar from "../components/sideBar/SideBar";
import Header from "../components/head/Header";
import Heading from "../components/head/Heading";
import ActionButton from "../components/actioButton/ActionButton.jsx";
import ViewLivestockModal from "../components/viewLivestockModal/ViewLivestockModal.jsx";
import EditLivestockModal from "../components/editLivestock/EditLivestockModal.jsx";
import AddLivestockModal from "../components/addlivestockmodal/AddLivestockModal.jsx";
import logo from '../images/livestockwatchicon.png';
import menuicon from "../images/dashboardmenuitem.png"

const Dashboard = () => {
  const [view, setView] = useState("dashboard");
  const [livestock, setLivestock] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchDashboardData = async () => {
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    try {
      const response = await axios.post(
        `${baseUrl}/dashboard.php`,
        { userid: data.userid },
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      setDashboardData(response?.data);
    } catch (error) {
      console.error("Error during fetching dashboard data:", error);
    }
  };

  const fetchAnimalData = async () => {
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    try {
      const response = await axios.post(
        `${baseUrl}/animal/animals.php`,
        { userid: data.userid },
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      setAnimalData(response?.data?.animals);
    } catch (error) {
      console.error("Error during fetching animal data:", error);
    }
  };

  // const handleViewChange = (view) => {
  //   setView(view);
  //   if (view === "dashboard") {
  //     fetchDashboardData();
  //   } else if (view === "animals") {
  //     fetchAnimalData();
  //   } else if (view === "appointments") {
  //     fetchAnimalData();
  //   } else if (view === "settings") {
  //     fetchAnimalData();
  //   }
  // };

  // useEffect(() => {
  //   handleViewChange(view);
  // }, [view]);

  useEffect(() => {
    fetchAnimalData();
    fetchDashboardData();
  }, [baseUrl])

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
    const updatedLivestock = livestock.map((item) =>
      item.id === selectedLivestock.id
        ? { ...item, ...Object.fromEntries(formData.entries()) }
        : item
    );
    setLivestock(updatedLivestock);
    fetchDashboardData();
    handleCloseEditModal();
  };

  const handleDelete = async (id) => {
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
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
      setAnimalData(response?.data?.animals);
    } catch (error) {
      console.error("Error during delete:", error);
    }
    fetchDashboardData();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddLivestock = (newLivestock) => {
    setLivestock([...livestock, newLivestock]);
    fetchDashboardData();
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="Dashboard font-custom">
      <div className="main flex flex-row">
        <div className="bg-none md:bg-none lg:bg-primary"><Sidebar/></div>
        
        <div className="rightdashboard w-full">
          {view === "dashboard" && (
            <div className="innerrightdashboard">
              {/* Header & Heading */}
              <div className="innerrightdashboardtop">
                <div className="mb-4 items-center"><Header title="Dashboard" link="/dashboard"/></div>

                <div className="px-8">
                  <div className="mb-4"><Heading title="Dashboard"/></div>
                </div> 

              </div>

              {/* Stats */}
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 px-4 md:px-8 gap-5 mb-4">
                <div className="flex flex-col bg-primary rounded-md gap-1 pl-6 pr-20 py-6 text-white">
                  <div className="innerdashboardanimalcounttexts">
                    <img src={dogpaw} alt="img" />
                    <p className="text-left font-medium">Total No of Animals</p>
                    <span className="text-3xl text-left font-medium"> {dashboardData?.totalcount} </span>
                  </div>
                </div>
                <div className="flex flex-col bg-fa rounded-md gap-1 pl-6 pr-20 py-6 text-black2">
                  <div className="innerdashboardanimalcount2texts">
                    <img src={dogpaw} alt="img" />
                    <p className="text-left font-medium">Species Distribution</p>
                    <span className="text-3xl text-left font-medium">{dashboardData?.specieCount}</span>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-row gap-3 px-8">
                <img src={chart} alt="chart" className="w-[60%]" />
                <img src={chart1} alt="chart" className="w-[40%]"/>
              </div> */}


              <div className="Animalcharttable px-4 md:px-8">
                <div className="Animalcharttable-top flex flex-row justify-between mb-4">
                  <div className="text-primary text-2xl font-semibold">Livestock</div>
                  <div className=" text-black2 text-md font-medium px-4">
                    <Link to="/animals" className="flex flex-row cursor-pointer gap-1 items-center">See All<RxCaretRight/></Link>
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

                {/* Desktop Table */}
                <div className="mx-4 md:mx-4 hidden md:block">
                  <table className="min-w-full border-collapse border border-disable px-4 md:px-4 py-4">
                    <thead className="bg-fa text-sm text-left">
                      <tr className="px-4 py-8">
                        <th className="px-6 py-6 text-black font-normal">ID</th>
                        <th className="px-4 py-6 text-black font-normal">Specie</th>
                        <th className="px-4 py-6 text-black font-normal">Status</th>
                        <th className="px-4 py-6 text-black font-normal">Last Treatment</th>
                        <th className="px-4 py-6 text-black font-normal">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dashboardData?.animals?.slice(0, 3).map((animal, index) => (
                        <tr key={index} className="text-black2 text-sm text-left items-center border-b border-disable px-4 py-8">
                          <td className="px-6 py-6">{index + 1}</td>
                          <td className="px-4 py-6">{animal?.specie}</td>
                          <td className="px-4 py-6">{animal?.status}</td>
                          <td className="px-4 py-6">{animal?.last_treatment}</td>
                          <td className="px-6">
                            <ActionButton
                              onView={() => handleOpenViewModal(animal)}
                              onEdit={() => handleOpenEditModal(animal)}
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
                    {dashboardData?.animals?.slice(0, 3).map((animal, index) => (
                        <div className="flex flex-row px-4 py-4 justify-between border-b border-disable items-center">
                          {/* Left side */}
                          <div className="flex flex-col text-sm text-left text-black2 font-normal gap-1">
                            <p className="">{animal?.specie}</p>
                            <p className="">{animal?.status}</p>
                          </div>

                          {/* Right side */}
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-right text-black2 font-normal gap-2">
                              {/* <p className="">{animal?.temperature}°C</p> */}
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
          )}
          {/* {view === "animals" && <Animals />}
          {view === "appointments" && <Appointments />}
          {view === "settings" && <Settings />} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
