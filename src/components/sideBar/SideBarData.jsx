import "./sideBar.css";
import { RxDashboard } from "react-icons/rx";
import { RiFileList3Line } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { IoPawOutline } from "react-icons/io5";

const SidebarData =
    [
      {
        title: "Dashboard",
        path: "/dashboard",
        icons: <RxDashboard className="w-5 h-5"/>,
        id: 1
      },
  
      {
        title: "Animals",
        path: "/animals",
        icons: <IoPawOutline className="w-5 h-5"/>,
        id: 2
      },

      {
        title: "Appointment",
        path: "/appointment",
        icons: <FaRegCalendarPlus className="w-5 h-5"/>,
        id: 3
      },

      {
        title: "Settings",
        path: "/settings",
        icons: <SlSettings className="w-5 h-5"/>,
        id: 4
      },
    ]

 
export default SidebarData;