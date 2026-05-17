import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService }
  from '../users/users.service';

import { tempUsers }
  from './temp.store';
import { EmailService } from '../email/email.service';
@Injectable()
export class AuthService {

  constructor(
    private readonly usersService:
      UsersService,
    private readonly emailService:
      EmailService,
    private jwtService: JwtService
  ) { }

  async createOtp() {
    return Math.floor(
      100000 +
      Math.random() * 900000,
    ).toString();
  }
  async sendOtp(body: any) {
    const oldUser =
      await this.usersService
        .findByEmail(body.email);

    if (oldUser) {
      return {
        success: false,
        message: 'Email already exists',
      };
    }

    const otp = await this.createOtp();

    tempUsers[body.email] = {
      ...body,
      otp,
      otp_expiry:
        Date.now() + 5 * 60 * 1000,
    };
    await this.emailService.sendOtp(
      body.email,
      otp,
    );

    console.log(
      'OTP:',
      otp,
    );

    // SEND EMAIL HERE

    return {
      success: true,
      message:
        'OTP_SENT',
    };
  } 
 

  async verifyOtp(body: any) {
    const data =
      tempUsers[body.email];

    if (!data) {
      return {
        success: false,
        message:
          'User not found',
      };
    }
    if (
      data.otp !== body.otp
    ) {
      return {
        success: false,
        message:
          'Invalid OTP',
      };
    }
    return {
      success: true,
      message:
        'OTP verified successfully',
    };
  }

   async register(body: any) {
    const oldUser =
      await this.usersService
        .findByEmail(body.email);

    if (oldUser) {
      return {
        success: false,
        message: 'Email already exists',
      };
    }
    const husband =
      await this.usersService.create({
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        mobile_upi:
          body.mobile_upi,
        role: 'husband',
        is_verified: true,
      });

    if (
      body.wives &&
      body.wives.length
    ) {

      for (
        const wife
        of body.wives
      ) {

        await this.usersService
          .create({

            pid: husband._id,

            name: wife.name,

            email: wife.email,

            mobile_upi:
              wife.mobile_upi,

            role: 'wife',

            is_verified: true,
          });
      }
    }
     delete tempUsers[
      body.email
    ];
    return {
      success: true,
      message:
        'User registered successfully',
    };
  }

  async login(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    } 

    const otp = await this.createOtp();
    tempUsers[email+'login'] =otp;
    await this.emailService.sendOtp(email, otp, true);

    return { message: 'OTP sent' };
  }

async verifyLoginOtp(email: string, otp: string) {
  const storedOtp = tempUsers[email+'login'];

  if (!storedOtp) {
    throw new Error('OTP expired or not found');
  }
  const user = await this.usersService.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  if (storedOtp !== otp) {
    throw new Error('Invalid OTP');
  }

  delete tempUsers[email+'login'];
  const token = this.jwtService.sign({
    sub: user._id,
    email: user.email,
    role: user.role,
   });

  return {
    token,
    user,
  };
} 
}