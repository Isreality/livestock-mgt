import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../fonts.css"
import not from "../images/not.png";
import userimg from "../images/user.png"
import edituser from "../images/edit img.png"
import axios from "axios";
import Sidebar from "../components/sideBar/SideBar";
import Header from "../components/head/Header";
import Heading from "../components/head/Heading";
import UpdataProfile from "./UpdataProfile";

const Settings = () => {
  const [view, setView] = useState("settings");
  const [userProfile, setUserProfile] = useState(null);
  const [animalData, setAnimalData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const userData = async () => {
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    try {
      const response = await axios.post(
        `${baseUrl}/updateprofile/getuserprofile.php`,
        { userid: data.userid },
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      setUserProfile(response?.data?.userprofile);
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle error, e.g., show an error message to the user
    }
  };
  // JSON.parse(data)
  useEffect(() => {
    userData();
  }, [baseUrl]);

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

  // Function to handle view change and fetch data accordingly
  const handleViewChange = (view) => {
    setView(view);
    if (view === "dashboard") {
      fetchDashboardData();
    } else if (view === "animals") {
      fetchAnimalData();
    } else if (view === "anppointments") {
      fetchAnimalData();
    } else if (view === "settings") {
      fetchAnimalData();
    }
  };

  return (
    <div className="font-custom">
      <div className="flex flex-row">
        <Sidebar/>

        <div className="w-full">
          {view === "settings" && (
          <div className="Settings">
            
            {/* Header & Heading */}
            <div className="innerrightdashboardtop">
              <div className="mb-4 items-center"><Header title="Settings" link="/settings"/></div>

              <div className="flex md:flex-row flex-col justify-between items-left md:items-center px-4 md:px-8 mb-4">
                <div className="mb-4 text-left"><Heading title="Settings"/></div>
                  <div>
                    <Link to="/settings/updateprofile" className="flex flex-row items-center bg-primary py-4 px-6 text-white text-md text-center rounded-md gap-2">
                      {/* <button
                        onClick={() => handleViewChange("updateprofile")}
                        className="flex flex-row items-center bg-primary py-4 px-6 text-white text-md text-center rounded-md gap-2"
                      > */}
                        <img src="edit.svg" alt="Edit Icon" width="15" height="15" />{" "}
                        Edit Profile
                      {/* </button> */}
                    </Link>
                  </div>
              </div>
            </div>

            {/* Body */}
            <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-4 md:mx-8">
                  <div className="gap-5 flex flex-col">
                      {/* Name */}
                      <div className="flex flex-row justify-between bg-fa p-4 lg:p-8 rounded-md cursor-pointer">
                          <div className="flex flex-row md:flex-row items-center text-xs md:text-base gap-2 text-black2">
                            <img className="name-icon size-6 md:size-10" src="name.svg" alt="" />
                            <p className="text-black2 font-normal">Name</p>
                          </div>

                          <div className="flex flex-row items-center text-xs md:text-base sm:ml-96 gap-3">
                            <p className="text-black2 font-normal">{userProfile?.fullname}</p>
                          </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-row justify-between bg-fa p-4 lg:p-8 rounded-md cursor-pointer">
                          <div className="flex flex-row items-center text-xs md:text-base gap-2 text-black2">
                              <img className="name-icon size-6 md:size-10" src="email.svg" alt="" />
                              <p className="text-black2 font-normal">Email</p>
                          </div>

                          <div className="flex flex-row text-xs md:text-base items-center sm:ml-96 gap-3">
                            <p className="text-black2 font-normal">{userProfile?.email}</p>
                          </div>
                      </div>
                  </div>  
            </div>  
          </div>
          )}
        </div>
      </div>
      
        {view == "updateprofile" && <UpdataProfile />}
      </div>
  );
};

export default Settings;
