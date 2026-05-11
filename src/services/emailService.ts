// import axios from "axios";
// import { toast_error, toast_success } from "./toastService";

// export const sendOTPEmail = async (email: string, otp: string) => {
//   try {
//     console.log("🔥 TEST LOG: Sending OTP to "+ email, otp);
//     const RESEND_API_KEY = "re_9QAJQ292_LQkXbWbHxnGYaCAHjSQvwoDi"; // Replace this
//       console.log("🔥 TEST LOG WORKING");
//       const response = await axios.post(
//         "https://backend-qq772zrel-silver.vercel.app/api/send-otp",
//         { email, otp }
//       );
        
//     // const response = await axios.post(
//     //   "https://api.resend.com/emails",
//     //   {
//     //     from: "Dinner App <onboarding@resend.dev>",
//     //     to: email,
//     //     subject: "Your Login OTP",
//     //     html: `<p>Your OTP is <strong>${otp}</strong></p>`,
//     //   },
//     //   {
//     //     headers: {
//     //       Authorization: `Bearer ${RESEND_API_KEY}`,
//     //       "Content-Type": "application/json",
//     //     },
//     //   }
//     // );   
//     toast_success("OTP Sent");
//     console.log("🔥 TEST LOG Sucess"+JSON.stringify(response) );
    
//     return response
//   } catch (err: any) {
//     console.log("🔥 ERROR LOG: ", err);
//     toast_error("Failed to send OTP");
//     return  err
//   }
// };

import axios from "axios";
import { toast_error, toast_success } from "./toastService";

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    console.log("🔥 Sending OTP to:", email, "OTP:", otp);

    const response = await axios.post(
      "https://backend-snowy-kappa-94.vercel.app/api/send-otp",
      { email, otp }
    );

    console.log("🔥 OTP Sent Successfully:", response.data);
    toast_success("OTP Sent!");

    return response.data;

  } catch (err) {
    console.log("🔥 ERROR LOG:", err);
    toast_error("Failed to send OTP");
    throw err;
  }
};