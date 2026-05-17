import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendOtp(email: string, otp: string, forlogin = false ) {
    console.log('Sending OTP to:', email);
    console.log('OTP:', otp);
    // await this.transporter.sendMail({
    //   from: process.env.MAIL_USER,
    //   to: email,
    //   subject: 'OTP Verification',
    //   html: `
    //     <h2>Your OTP</h2>
    //     <h1>${otp}</h1>
    //     ${forlogin ? '<p>This is for login purposes only.</p><p>This OTP will expire in 5 minutes.</p>' :  '<p>This OTP is for registration purposes.</p><p>This OTP will expire in 5 minutes.</p>'}
    //   `,
    // });


    return true;
  }
}