import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Appointments.css";
import "./fonts.css";
import not from "../images/not.png";
import profile from "../images/user.png";
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
    <div className="Appointments">
      <div className="innerrightAppointmentstop">
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
          {/* <img src={not} alt="notifications" /> */}
          <img src={profile} alt="profile" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="Appoinmentsbody">
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

        </div>
      </form>
    </div>
  );
};

export default Appointments;
