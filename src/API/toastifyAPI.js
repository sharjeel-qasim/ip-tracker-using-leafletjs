import { toast } from "react-toastify";

// Custom error function for react toastify
export const showError = (message) => {
  toast(message, {
    type: "error",
    autoClose: 4000,
  });
};
