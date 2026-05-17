import * as nodemailer from 'nodemailer';

export const sendOtpEmail = async (
  email: string,
  otp: string,
) => {

  const transporter =
     nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

  const info = await transporter.sendMail({

    from: 'YOUR_EMAIL@gmail.com',

    to: email,

    subject: 'DinnerMe OTP',

    html: `
      <h2>Your OTP is:</h2>
      <h1>${otp}</h1>
    `,
  });

  console.log(info);
};