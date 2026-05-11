// import { Injectable } from '@nestjs/common';
// import { EmailService } from '../email/email.service';

// @Injectable()
// export class AuthService {

//   constructor(
//     private readonly emailService: EmailService,
//   ) {}

//   async register(data: any) {

//     const otp = Math.floor(
//       100000 + Math.random() * 900000,
//     ).toString();

//     await this.emailService.sendOtp(
//       data.email,
//       otp,
//     );

//     return {
//       message: 'OTP sent successfully',
//     };
//   }
// }

import { Injectable } from '@nestjs/common';

import { EmailService } from '../email/email.service';
import { UsersService }
from '../users/users.service';
import { tempUsers } from './temp.store';

// import { tempUsers } from './temp.store';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService:
    UsersService,
  ) {}

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

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000,
      ).toString();

    tempUsers[body.email] = {
      ...body,
      otp,
      otp_expiry:
        Date.now() + 5 * 60 * 1000,
    };

    console.log(
      'OTP:',
      otp,
    );

    await this.emailService.sendOtp(
      data.email,
      otp,
    );

    // SEND EMAIL HERE

    return {
      success: true,
      message:
        'OTP sent successfully',
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

    const husband =
      await this.usersService.create({

        name: data.name,
        email: data.email,
        mobile_upi:
          data.mobile_upi,

        role: 'husband',

        is_verified: true,
      });

    if (
      data.wives &&
      data.wives.length
    ) {

      for (
        const wife
        of data.wives
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
        'Registration successful',
    };
  }
}