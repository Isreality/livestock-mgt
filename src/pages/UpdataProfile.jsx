import React, { useEffect, useState } from "react";
import "../fonts.css"
import Sidebar from "../components/sideBar/SideBar";
import Header from "../components/head/Header";
import Heading from "../components/head/Heading";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios"; import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdataProfile = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previousPassword, setPreviousPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePreviousPasswordChange = (e) =>
    setPreviousPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  //I added this function here. From Yori
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
      console.log(response);
      setProfileImage(response?.data?.userprofile?.profilepic);
      console.log(profileImage);
    } catch (error) {
      console.error("Error during sign in:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // console.log(profileImage);

  useEffect(() => {
    userData();
  })
  //And it ended here. Check below for other info
  // setProfileImage(profileImage);
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (newPassword === confirmPassword) {
      const data = JSON.parse(sessionStorage.getItem("tokenObj"));
      try {
        const response = await axios.post(
          `${baseUrl}/updateprofile/changepassword.php`,
          {
            userid: data.userid,
            newpassword: newPassword,
            previouspassword: previousPassword,
          },
          {
            headers: {
              Accesstoken: data.accessToken,
            },
          }
        );
        // setAnimalData(response?.data?.animals);
        console.log(response);
      } catch (error) {
        console.error("Error during sign in:", error);
        // Handle error, e.g., show an error message to the user
      }
      alert(`Password updated successfully!`);
    } else {
      alert("New password and confirm password do not match.");
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  //I adjusted this update profile picture function. From Yori
  // const handleImageChange = async (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setProfileImage(URL.createObjectURL(file));

  //     const data = JSON.parse(sessionStorage.getItem("tokenObj"));
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     formData.append("userid", data.userid);

  //     try {
  //       const response = await axios.post(
  //         `${baseUrl}/updateprofile/updateprofilepicture.php`,
  //         formData,
  //         {
  //           headers: {
  //             Accesstoken: data.accessToken,
  //             // "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log(response);
  //       if (response.data.response === true) {
  //         setProfileImage(response?.data?.data);
  //         console.log(profileImage);
  //       }
  //     } catch (error) {
  //       console.error("Error during image upload:", error);
  //     }
  //   }
  // };
  //It ended here

  const handleSubmitName = async (e) => {
    e.preventDefault();
    const data = JSON.parse(sessionStorage.getItem("tokenObj"));
    setLoading(true)
    // Handle form submission logic here
    const formData = new FormData();
    formData.append("userid", data.userid);
    formData.append("fullname", name);
    formData.append("email", email);
    try {
      const response = await axios.post(
        `${baseUrl}/updateprofile/updateuserdescription.php`,
        formData,
        {
          headers: {
            Accesstoken: data.accessToken,
          },
        }
      );
      console.error(response);
      // alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("Failed to update profile.");
    } finally {
      setLoading(false)

    }

    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <div className="font-custom">
      <div className="personal-info-header-wrapper flex flex-row">
        <div className="bg-none md:bg-none lg:bg-primary"><Sidebar/></div>

        <div className="updateprofiletopleft w-full">
          {/* Header & Heading */}
          <div className="innerrightdashboardtop">
            <div className="mb-4 items-center"><Header title="Edit Profile" link="/settings/updateprofile"/></div>
            <div className="px-8">
              <div className="mb-4"><Heading title="Personal Information"/></div>
            </div> 
          </div>

          {/* Personal Info */}
          <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-4 md:mx-8">
            {/* <div className="profile-image-container">
              <img
                src={profileImage || "default-profile.png"} //I already set profileImage to the image here, and it works. But nnow you will work on it so that when the image is changed, it sets the image to the new image set. From Yori
                alt="Profile"
                className="profile-image rounded-full"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-camera"></i>
              </label>
              <input
                // className="edit-input"
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                className="image-upload-input"
              />
            </div> */}
            
            {/* Form */}
            <form className='space-y-4' onSubmit={handleSubmitName}>
                      {/* Full Name */}
                      <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                        <label htmlFor="name" className='text-xs md:text-base text-black2'>Full Name</label><br/>
                        <input 
                            className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2 text-xs md:text-base' 
                            type='text' 
                            id = "name" 
                            // placeholder='example@gmail.com'
                            value={name}
                            onChange={handleNameChange}
                        />
                      </div>

                      {/*Email*/}
                      <div className='space-y-1 md:space-y-2 items-start text-left'>
                        <label htmlFor="email" className='text-xs md:text-base text-black2'>Email</label><br/>
                        <input 
                            className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2 text-xs md:text-lg' 
                            type='email' 
                            id = "email" 
                            // placeholder='example@gmail.com'
                            value={email}
                            onChange={handleEmailChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="grid justify-items-end">
                        <button type="submit"  className='mt-4 w-full md:w-full lg:w-64 py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xs md:text-base font-medium'>
                          {/* {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Update'} */}
                          {loading ? (
                            <ThreeDots
                              type="ThreeDots"
                              color="#fff"
                              height={30}
                              width={30}
                            />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div> 
                  </form>
          </div><br/><br/>

          {/* Change Password */}
          <div className="px-4 md:px-8">
              <div className="mb-4"><Heading title="Change Password"/></div>
          </div>

          <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-4 md:mx-8">
                  {/* Form */}
                  <form  className='grid justify-items-stretch text-left' onSubmit={handleSubmitPassword}>
                    <div className='space-y-1 md:space-y-2 items-start'>

                    </div>
                    
                    {/* Current Password */}
                    <div className='space-y-2' style={{ position: 'relative' }}>
                      <label htmlFor="current_password" className='text-xs md:text-base text-left mb-8'>Enter Current Password</label><br/>
                      <input
                        className="edit-input border p-6 w-full md:w-full text-xs md:text-base rounded-md border-fa bg-white focus:bg-white focus:outline-fa"
                        type={showPassword ? "text" : "password"}
                        id="previous-password"
                        value={previousPassword}
                        onChange={handlePreviousPasswordChange}
                        placeholder='Enter current password'
                      />
                      <span
                        onClick={toggleShowPassword}
                        className="toggle-password-visibility"
                        style={{
                          position: 'absolute',
                          top: '60%',
                          right: '30px', 
                          transform: 'translateY(-50%)', 
                          cursor: 'pointer', 
                          color: '#c4c4c4', 
                        }}
                      >
                        <i
                          className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                        ></i>
                      </span>
                    </div><br/>
                    
                    {/* New Password */}
                    <div className='space-y-2' style={{ position: 'relative' }}>
                      <label htmlFor="new_password" className='text-xs md:text-base text-left mb-8'>Enter New Password</label><br/>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="new-password"
                        className="edit-input border p-6 w-full md:w-full rounded-md text-xs md:text-base border-fa bg-white focus:bg-white focus:outline-fa"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        placeholder='Enter new password'
                      />
                      <span
                        onClick={toggleShowPassword}
                        className="toggle-password-visibility"
                        style={{
                          position: 'absolute',
                          top: '60%',
                          right: '30px', 
                          transform: 'translateY(-50%)', 
                          cursor: 'pointer', 
                          color: '#c4c4c4', 
                        }}
                      >
                        <i
                          className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                        ></i>
                      </span>
                    </div><br/>

                    {/* Re-enter Password */}
                    <div className='space-y-2' style={{ position: 'relative' }}>
                      <label htmlFor="new_password_confirmation" className='text-xs md:text-base text-left mb-8'>Confirm New Password</label><br/>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="edit-input border p-6 w-full md:w-full rounded-md text-xs md:text-base border-fa bg-white focus:bg-white focus:outline-fa"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder='Confirm password'
                      />
                      <span
                        onClick={toggleShowPassword}
                        className="toggle-password-visibility"
                        style={{
                          position: 'absolute',
                          top: '60%',
                          right: '30px', 
                          transform: 'translateY(-50%)', 
                          cursor: 'pointer', 
                          color: '#c4c4c4', 
                        }}
                      >
                        <i
                          className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                        ></i>
                      </span>
                    </div><br/>

                    <div className="grid justify-items-end">    
                      {/* <button type="submit" className='mt-4 w-full md:w-64 py-4 px-20  rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'> */}
                      <button type="submit" className="update-button mt-4 w-full md:w-full lg:w-64 py-4 px-20  rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-xs md:text-base font-medium">
                        {loading ? (
                          <ThreeDots
                            type="ThreeDots"
                            color="#000"
                            height={30}
                            width={30}
                          />
                        ) : (
                          "Update"
                        )}
                      </button>
                        {/* {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Update'} */}
                      {/* </button> */}
                    </div>
                  </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdataProfile;
