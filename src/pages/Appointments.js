import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./Appointments.css";
import "../fonts.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import not from "../images/not.png";
import profile from "../images/user.png";
import Sidebar from "../components/sideBar/SideBar";
import Header from "../components/head/Header";
import Heading from "../components/head/Heading";
import { appointmentTime } from "../utils/site";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminder, setReminder] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReminderChange = (event) => {
    setReminder(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const data = JSON.parse(sessionStorage.getItem("tokenObj"));
  const [appointmentData, setAppointmentData] = useState({
    id: data.userid,
    meetingMode: mode,
    date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    time: time,
    reminder: reminder,
    email: email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !time || !mode || !email) {
      toast.error("Please fill all the required fields");
      return;
    }

    const formData = new FormData();
    formData.append("userid", appointmentData.id);
    formData.append("meeting-mode", mode);
    formData.append("date", selectedDate.toISOString().split("T")[0]);
    formData.append("time", time);
    formData.append("reminder", reminder);
    formData.append("email", email);

    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/appointment/addappointment.php`,
        formData,
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      setLoading(false);
      toast.success("Appointment booked successfully!");

      // Reset form fields
      setSelectedDate(null);
      setTime("");
      setReminder("");
      setMode("");
      setEmail("");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="font-custom">
      <div className="flex flex-row">
        <div className="bg-none md:bg-none lg:bg-primary"><Sidebar/></div>
        <div className="w-full">
          {/* Header & Heading */}
          <div className="innerrightdashboardtop">
            <div className="mb-4 items-center"><Header title="Appointment" link="/appointment"/></div>
            <div className="px-8">
              <div className="mb-4"><Heading title="Book Appointment"/></div>
            </div> 
          </div>

          {/* Body */}
          <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-4 md:mx-8">
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* Email */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label htmlFor="email" className='text-xs md:text-base text-black2'>Email</label><br/>
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2 text-xs md:text-base' 
                  type='text' 
                  id = "email" 
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              {/* Treatment */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label htmlFor="email" className='text-xs md:text-base text-black2'>Date of Treatment</label><br/>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="yyyy/mm/dd"
                  className="date-picker border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2 text-xs md:text-base"
                  dateFormat="yyyy/MM/dd"
                />
              </div><br/>

              {/* Times slots */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label className='text-xs md:text-base text-black2'>Available Time slots <span className="text-primary">(Monday to Friday)</span></label><br/>
                <div className="timeslots grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-2 ">
                    {appointmentTime.map((appointment, index) => (
                      <div
                        key={index}
                        className={`timeslot ${appointment.id}`}
                        onClick={() => setTime(appointment.time)}
                      >
                        <button type="button" className={time === appointment.time ? "selected bg-primary text-white text-xs md:text-base px-8 py-4 rounded-md w-full" : "bg-fa hover:bg-primary text-black2 text-xs md:text-base hover:text-white px-8 py-4 rounded-md w-full"}>
                          {appointment.time}
                        </button>
                      </div>
                    ))}
                </div>
              </div><br/>
              
              {/* Reminder */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label className='text-xs md:text-base text-black2'>Reminder</label><br/> 
                <div className="reminder-dropdown-container">
                  <select
                    value={reminder}
                    onChange={handleReminderChange}
                    className="reminder-dropdown block appearance-none border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2 text-xs md:text-base"
                  >
                    <option value="" disabled>
                      Set Reminder
                    </option>
                    <option value="exact-date">Exact Date</option>
                    <option value="24-hours">24 Hours</option>
                    <option value="48-hours">48 Hours</option>
                    <option value="72-hours">72 Hours</option>
                    <option value="1-week">1 Week</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-2 text-black2">
                    <RiArrowDropDownLine className="h-6 w-6"/>
                  </div>
                </div>  
              </div>

              {/* Mode of meeting */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label className='text-xs md:text-base text-black2'>Mode of meeting</label><br/> 
                <div className="reminder-dropdown-container flex flex-col md:flex-row gap-2">
                    <button
                      type="button"
                      className={`mode ${mode === "Physical" ? "selected bg-primary text-white text-xs md:text-base px-16 py-4 rounded-md" : "bg-fa hover:bg-primary text-black2 text-xs md:text-base hover:text-white px-16 py-4 rounded-md"}`}
                      onClick={() => setMode("Physical")}
                    >
                      Physical
                    </button>
                    <button
                      type="button"
                      className={`mode ${mode === "Virtual" ? "selected bg-primary text-white text-xs md:text-base px-16 py-4 rounded-md" : "bg-fa hover:bg-primary text-black2 text-xs md:text-base hover:text-white px-16 py-4 rounded-md"}`}
                      onClick={() => setMode("Virtual")}
                    >
                      Virtual
                    </button>
                </div>  
              </div>

              <div className="grid justify-strecth md:justify-stretch lg:justify-end">
                <button type="submit" className="submit-btn mt-4 w-full md:w-full py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xs md:text-base font-medium" disabled={loading}>
                        {loading ? (
                          <ThreeDots
                            height="10"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            visible={true}
                          />
                        ) : (
                          "Book Appointment"
                        )}
                </button>
              </div>

              
              
                

              
            </form>
          </div>
          
        </div>
      </div>

      {/* <div className="Appoinmentsbody">
                <h2>Email</h2>
                <div className="date-picker-container">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <h2>Date of last Treatment</h2>
                <div className="date-picker-container">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText="SELECT A DATE"
                    className="date-picker"
                    dateFormat="yyyy/MM/dd"
                  />
                </div>
                <h2>Available Time slots (Monday to Friday)</h2>
                <div className="timeslots">
                  {appointmentTime.map((appointment, index) => (
                    <div
                      key={index}
                      className={`timeslot${appointment.id}`}
                      onClick={() => setTime(appointment.time)}
                    >
                      <button type="button" className={time === appointment.time ? "selected" : ""}>
                        {appointment.time}
                      </button>
                    </div>
                  ))}
                </div>
                <h2>Reminder</h2>
                <div className="reminder-dropdown-container">
                  <select
                    value={reminder}
                    onChange={handleReminderChange}
                    className="reminder-dropdown"
                  >
                    <option value="" disabled>
                      Set Reminder
                    </option>
                    <option value="exact-date">Exact Date</option>
                    <option value="24-hours">24 Hours</option>
                    <option value="48-hours">48 Hours</option>
                    <option value="72-hours">72 Hours</option>
                    <option value="1-week">1 Week</option>
                  </select>
                </div>
                <h2>Mode of Meeting</h2>
                <div className="appointment-buttom">
                  <div className="meeting-mode">
                    <button
                      type="button"
                      className={`mode ${mode === "Physical" ? "selected" : ""}`}
                      onClick={() => setMode("Physical")}
                    >
                      Physical
                    </button>
                    <button
                      type="button"
                      className={`mode ${mode === "Virtual" ? "selected" : ""}`}
                      onClick={() => setMode("Virtual")}
                    >
                      Virtual
                    </button>
                  </div>
                  <div className="bookappoinment">
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? (
                        <ThreeDots
                          height="10"
                          width="40"
                          radius="9"
                          color="white"
                          ariaLabel="three-dots-loading"
                          visible={true}
                        />
                      ) : (
                        "Book Appointment"
                      )}
                    </button>
                  </div>
                </div>

              </div>                  */}

      {/* <div className="innerrightAppointmentstop">
        <div className="Appointmentsstopleft">
          <h2 className="Appointmentspage">
            Home {">"} <span className="blueAppointments"> Appointment</span>
          </h2>
          <div className="Appointmentshealthtop">
            <h1 className="Appointmentspagetop">Appointment</h1>
            <div className="Appointmentshealth"></div>
          </div>
        </div>
        <div className="Appointmentstopright">
          <img src={profile} alt="profile" />
        </div>
      </div> */}
      
    </div>
  );
};

export default Appointments;
