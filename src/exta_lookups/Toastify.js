import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global toast styles for black background & white text
const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
  style: {
    backgroundColor: "#000", // 🔥 Black background
    color: "#fff", // 🔥 White text
    fontWeight: "bold",
    borderRadius: "8px",
  },
};

export const successToast = (message) => {
  toast.success(message, toastOptions);
};

export const errorToast = (message) => {
  toast.error(message, toastOptions);
};

export const failureToast = (message) => {
  toast.error(message, toastOptions);
};
