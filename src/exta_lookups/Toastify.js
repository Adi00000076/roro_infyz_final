import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 800,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

export const successToast = (message) => {
  toast.success(message, toastOptions);
};

export const errorToast = (message) => {
  toast.error(message, toastOptions);
};

export const failureToast = (message) => {
  // Using error toast for failure as well, can customize if needed
  toast.error(message, toastOptions);
};
