import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const resend = new Resend("re_9QAJQ292_LQkXbWbHxnGYaCAHjSQvwoDi"); // Replace with your actual API key
    // const resend = new Resend(process.env.RESEND_API_KEY);

    const { email, otp } = req.body;
    console.log("🔥 Received request to send OTP to:", email, "OTP:", otp);
    console.log("🔥 RESEND_API_KEY:", process.env.RESEND_API_KEY ? "SET" : "NOT SET");
    console.log("🔥 FROM_EMAIL:", process.env.FROM_EMAIL ? "SET" : "NOT SET");

    const response = await resend.emails.send({
        from: "Dinner App <onboarding@resend.dev>",
    //   from: `Dinner App <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Your Login OTP",
      html: `<p>Your OTP is <strong>${otp}</strong></p>`
    });

    return res.status(200).json({ success: true, response });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}