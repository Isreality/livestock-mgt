import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "./otp-modal.css";
import SuccessModal from "../signup-succes-modal/SuccessModal";

const OTPModal = ({ isOpen, onClose, onVerifySuccess }) => {
  const [otp, setOtp] = useState(new Array(7).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  useEffect(() => {
    if (!isOpen) {
      setTimer(180); // Reset the timer when modal is closed
    }
  }, [isOpen]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const validateVerify = () => {
    if (!otp.join("").trim()) return "OTP is Required";
    return null;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const errorMessage = validateVerify();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    setLoading(true);
    try {
      const userId = sessionStorage.getItem("userData");
      console.log(userId);
      console.log({
        userid: userId,
        code: otp.join(""),
      });
      const response = await axios.post(
        `${baseUrl}/authenticate/verify_user.php`,
        {
          userid: userId,
          code: otp.join(""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success("OTP verified successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await axios.post("/api/resend-otp");
      setLoading(false);
      toast.success("OTP resent successfully!");
      setTimer(180); // Reset the timer
    } catch (error) {
      setLoading(false);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleProceed = () => {
    setShowSuccessModal(false);
    onVerifySuccess();
    onClose();
  };

  return (
    <>
      {isOpen && !showSuccessModal && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <button className="close" onClick={onClose}>
              &times;
            </button>
            <h2>OTP Verification</h2>
            <p>Please Enter the 7-digit code sent to your email</p>
            <div className="otp-inputs">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <button
              className="verify-btn"
              onClick={handleVerify}
              disabled={loading}
            >
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
                "Verify"
              )}
            </button>
            <p className="resend-text">
              Didn’t receive code?{" "}
              <span onClick={handleResend}>Resend Code</span>
            </p>
            <p className="timer">
              {Math.floor(timer / 60)}m : {timer % 60}s left
            </p>
          </div>
        </div>
      )}
      <SuccessModal isOpen={showSuccessModal} onProceed={handleProceed} />
    </>
  );
};

export default OTPModal;
