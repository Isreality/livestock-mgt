import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Settings.css";
import not from "../images/not.png";
import userimg from "../images/user.png"
import edituser from "../images/edit img.png"
import axios from "axios";
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
    <>
    {view === "settings" && (
      <div className="Settings">
      <div className="innerrightAppointmentstop">
        <div className="Appointmentsstopleft">
          <h2 className="Appointmentspage">
            Home {">"} <span className="blueAppointments"> Setting</span>
          </h2>
          <div className="Appointmentshealthtop">
            <h1 className="Appointmentspagetop">Setting</h1>
            <div className="Appointmentshealth"></div>
          </div>
        </div>

        <div className="Appointmentstopright">
          {/* <img src={not} alt="notifications" />
          <img src={userimg} alt="profile" /> */}
        </div>
      </div>
        <div className="user-info">
          <div className="edit-profile-wrapper">
            <div className="edit-profile edit-profile-head">
              <div className="edit-profile-right">
                <img className="user-image" src={userimg} alt="" />
                <h3 className="username"> {userProfile?.fullname}</h3>
              </div>
              <div className="edit-profile-right">
                <button
                  className="edit-profile-button"
                  onClick={() => handleViewChange("updateprofile")}
                >
                  <img src="edit.svg" alt="Edit Icon" width="15" height="15" />{" "}
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="user-profile edit-tab">
              <div className="user-profile-right">
                <img className="name-icon" src="name.svg" alt="" />
                <h3 className="username-"> Name</h3>
              </div>
              <div className="user-profile-right">
                <h3 className="name">{userProfile?.fullname}</h3>
              </div>
            </div>
            <div className="user-profile edit-tab">
              <div className="user-profile-right">
                <img className="name-icon" src="email.svg" alt="" />
                <h4 className="username-"> Email</h4>
              </div>
              <div className="user-profile-right">
                <h3 className="name">{userProfile?.email}</h3>
              </div>
            </div>
          </div>
        </div>
    </div>
      )}
      {view == "updateprofile" && <UpdataProfile />}
      </>
  );
};

export default Settings;
