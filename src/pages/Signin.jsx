import React, { useState } from "react";
import "../fonts.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../images/Cat.png";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import logo from '../images/livestockwatchicon.png';

const Signin = () => {
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = signInData;
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    return null;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/authenticate/login_user.php`,
        signInData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.response === true) {
        toast.success("Signin successful!");
        sessionStorage.setItem("tokenObj", JSON.stringify(response?.data));
        navigate("/Dashboard");
      }
      // Handle successful sign up here, e.g., redirect or show a success message
    } catch (error) {
      toast.error("Signin failed. Please try again.");
      // Handle error, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signin-wrapper font-custom">
      {/* <div className="backhome">
        <Link to="/">
          <button className="backhomebutton">Homepage</button>
        </Link>
      </div>*/}
        <div className="flex flex-row gap-20 px-2">
          <div className="py-20 px-4 md:px-24 space-y-4 sm:m-12 lg:m-0 items-center rounded-lg">
            <div>
              <form method="post" onSubmit={handleSignIn} className="grid justify-items-stretch text-left m-auto gap-2">
                <img src={logo} alt="logo" className="w-[100px] md:w-[150px] object-cover"/>
                <div className="signintop text-primary text-left text-3xl md:text-4xl font-black mb-0 md:mb-2">Login</div>
                
                <div className="space-y-1 md:space-y-1 items-start">
                  <label className='text-md md:text-md text-left'>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signInData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    // className={signInData.email ? "filled" : "border-2 p-4 text-md w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"}
                    className="border-2 p-4 text-md w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"
                  ></input>
                </div><br/>
                  
                <div className="space-y-1 md:space-y-1 items-start">
                  <label className='text-md md:text-md text-left'>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signInData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="border-2 p-4 text-md w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"
                    // className={signInData.password ? "filled" : "border-2 p-4 text-md w-80 md:w-full rounded-md border-fa bg-fa focus:outline-primary focus:bg-fa"}
                  ></input>
                </div><br/>
                
                {/* Button */}
                <button type="submit"
                  className="signupbutton flex w-80 md:w-96 lg:w-full py-4 px-20 md:px-64 lg:px-64 rounded-md border-fa bg-primary cursor-pointer text-white text-md justify-center font-bold"
                  disabled={loading}>
                    Sign In
                </button>

                {/* </Link> */}
                <div className="signinbottom">
                  Don't have an account?{" "}
                  <Link to="/signUp">
                    <button className=" text-primary font-medium text-md">Sign-Up</button>
                  </Link> 
                </div>
              </form>
            </div>
          </div>

          <div className="rightsignin hidden md:hidden lg:flex">
            <img src={Cat} alt="dog image" className="w-full h-screen right-0"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
