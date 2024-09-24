import { createContext, ReactNode, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext(undefined);
const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

const contextClass = {
  success: "bg-red text-black",
  error: "bg-white text-black",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  // default: "bg-indigo-600",
  dark: "bg-red-600 text-black font-black-300",
};

function ToastProvider({ children }) {
  return (
    <div>
      <ToastContext.Provider value={{ toast }}>
        <ToastContainer
          position="top-center"
          toastClassName={({ type }) => {
            const customClassName = contextClass[type || "default"];
            return (
              customClassName +
              " relative flex p-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer text-sm"
            );
          }}
        />
        {children}
      </ToastContext.Provider>
    </div>
  );
}

export { ToastProvider, useToastContext };
