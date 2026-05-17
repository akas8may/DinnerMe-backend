import axios from "axios";
import { toast_error, toast_success } from "./toastService";

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    await axios.post("https://dinnerme-api.onrender.com/email/send-otp", {
      email,
      otp,
    });
    toast_success("OTP sent to email");
  }