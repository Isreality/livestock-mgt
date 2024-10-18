import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing"
import Signup from "./pages/Signup";
import { ToastProvider } from "./context/toastContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Animals from "./pages/Animals";
import Settings from "./pages/Settings";
import Appointments from "./pages/Appointments";
import UpdataProfile from "./pages/UpdataProfile";
import "./pages/style.css";
import "./index.css";
import "./fonts.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/updateprofile" element={<UpdataProfile />} />
            <Route path="/appointment" element={<Appointments />} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
