import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dog from "../images/Dog.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../fonts.css"
import { ThreeDots } from "react-loader-spinner";
import OTPModal from "../components/otp-modal/OtpModal";
import logo from '../images/livestockwatchicon.png';

const Signup = () => {
  const navigate = useNavigate();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const { fullname, email, password, confirmPassword } = signUpData;
    if (!fullname) return "Fullname is required";
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    // Add your sign up logic here
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    setLoading(true);
    //SETTING TO FORM DATA
    const formDataObj = new FormData();
    formDataObj.append("fullname", signUpData.fullname);
    formDataObj.append("email", signUpData.email);
    formDataObj.append("password", signUpData.password);

    try {
      const response = await axios.post(
        `${baseUrl}/authenticate/register_user.php`,
        formDataObj,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      console.log(response?.data);
      if (response?.data?.response === true) {
        setShowOTPModal(true);
        // Save user ID and OTP code in session storage
        toast.success("Signup successful!");
        sessionStorage.setItem("userData", response?.data.userid);
        //  sessionStorage.setItem('otpCode', data.otpCode);
      }

      console.log("Sign up successful!");
      // Handle successful sign up here, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Signup failed. Please try again.");
      // Handle error, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerifySuccess = () => {
    // Handle successful OTP verification, e.g., navigate to login page
    navigate("/signIn");
    console.log("OTP verified successfully, redirecting to login...");
  };

  return (
    <>
      <div className="signup-wrapper font-custom">
      {/* <div className="backhome">
        <Link to="/">
          <button className="backhomebutton">Homepage</button>
        </Link>
      </div>  */}
        <div className="flex flex-row signup justify-between gap-20 px-2">
          <div className="py-20 px-4 md:px-24 space-y-4 sm:m-12 lg:m-0 items-center rounded-lg">
            <div>
              {/* Form */}
              <form onSubmit={handleSignUp} method="" className="grid justify-items-stretch text-left m-auto gap-5">
                <img src={logo} alt="logo" className="w-[100px] md:w-[150px] object-cover"/>
                <div className="signuptop text-primary text-left text-2xl md:text-4xl font-black mb-0 md:mb-2">Create an account</div>
                {/* Name */}
                <div className="space-y-1 md:space-y-1 items-start">
                  <label className='text-xs md:text-lg text-left'>Name</label> 
                    <input
                      type=" text"
                      placeholder="Enter Full Name"
                      name="fullname"
                      value={signUpData.fullname}
                      onChange={handleChange}
                      // className={signUpData.fullname ? "filled" : ""}
                      className="border-2 p-4 text-xs md:text-lg w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"
                    /> 
                </div>

                {/* Email */}
                <div className="space-y-1 md:space-y-1 items-start">
                  <label className='text-xs md:text-lg text-left'>Email </label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
                    value={signUpData.email}
                    onChange={handleChange}
                    // className={signUpData.email ? "filled" : ""}
                    className="border-2 p-4 text-xs md:text-lg w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"
                  />
                </div>
                  
                {/* Password */}
                <div className="space-y-1 md:space-y-1 items-start">
                  <label className='text-xs md:text-lg text-left'>Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    min={7}
                    value={signUpData.password}
                    onChange={handleChange}
                    // className={signUpData.password ? "filled" : ""}
                    className="border-2 p-4 text-xs md:text-lg w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1 md:space-y-1 items-start">
                  <label className='text-xs md:text-lg text-left'>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Re-Enter Password"
                    name="confirmPassword"
                    min={7}
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    // className={signUpData.password ? "filled" : ""}
                    className="border-2 p-4 text-xs md:text-lg w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"
                  />
                </div>                       

                {/* Button */}
                <button type="submit"
                  className="flex w-80 md:w-full py-4 px-20 md:px-60 rounded-md border-fa bg-primary cursor-pointer text-white text-xs md:text-lg justify-center font-medium"
                  disabled={loading}>
                    Sign Up
                </button>

                <div className=" flex flex-row items-center gap-2 text-center text-xs md:text-lg">
                  Already have an account?{" "}
                  <Link to="/signin" className=" text-primary font-bold text-xs md:text-lg">
                    {/* <button type="button" > */}
                      Sign In
                    {/* </button> */}
                  </Link>
                </div><br/>
              </form>
            </div>
          </div>

          <div className="rightsignup hidden md:flex lg:flex">
            <img src={dog} alt="dog" className="w-[500px] h-full object-cover right-0"/>
          </div>
        </div>
        <OTPModal
          isOpen={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          onVerifySuccess={handleOTPVerifySuccess}
        />
      </div>
    </>
  );
};

export default Signup;