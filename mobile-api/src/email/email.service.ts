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

  async sendOtp(email: string, otp: string) {

    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'OTP Verification',
      html: `
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
      `,
    });

    return true;
  }
}