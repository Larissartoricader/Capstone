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
`;
