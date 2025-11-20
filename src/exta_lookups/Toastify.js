import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-center",
  autoClose: 2800,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  transition: Bounce,
  style: {
    background: "rgba(0,0,0,0.85)",
    color: "#eaf6ff",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(0, 140, 255, 0.4)",
    boxShadow: "0 0 12px rgba(0,140,255,0.45)",
    fontWeight: 600,
    letterSpacing: "0.5px",
    borderRadius: "10px",
  },
};

export const successToast = (msg) => toast.success(msg, toastOptions);
export const errorToast = (msg) => toast.error(msg, toastOptions);
export const failureToast = (msg) => toast.error(msg, toastOptions);
