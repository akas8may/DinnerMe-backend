import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { convertToLocale } from 'src/common/locale.helper';
import {I18n,I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
}
  constructor(
    private readonly authService: AuthService,
  ) {}

   @Post('send-otp')
   async sendOtp(@Body() body: any, @I18n() i18n: I18nContext){
    const response = await this.authService.sendOtp(body);
    return convertToLocale(response, i18n);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: any) {
    return this.authService.verifyOtp(body);
  }

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }


  @Post('login')      // 👈 important
  login(@Body() body: any) {
    console.log('Login request:', body);
    return this.authService.login(body.email);
  } 
  
  @Post('verify-login-otp')
  verifyLoginOtp(@Body() body: any) {
    return this.authService.verifyLoginOtp(body.email, body.otp);
  }
}