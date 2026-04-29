import * as functions from "firebase-functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const otp = data.otp;

  try {
    const res = await resend.emails.send({
      from: `Dinner App <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Your Login OTP",
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    return { success: true, messageId: res.data?.id || "SENT" };
  } catch (error: any) {
    console.error("RESEND ERROR:", error);
    return {
      success: false,
      error: error.message || "Failed to send OTP",
    };
  }
});