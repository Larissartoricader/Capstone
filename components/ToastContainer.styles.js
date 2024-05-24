import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #014f32;
    color: #014f32;
    font-family: "Arial", sans-serif;
    border-radius: 10px;
  }

  .Toastify__toast--success {
    background-color: #fff;
  }

  .Toastify__progress-bar {
    background-color: #ffc107;
  }

  .Toastify__toast-icon {
    color: #ffc107; /* Customize the color of the icon */
  }

  .Toastify__close-button {
    color: #ffffff; /* Customize the color of the close button */
    opacity: 1;
  }

  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    color: #ffc107; /* Change color on hover or focus */
  }
`;
