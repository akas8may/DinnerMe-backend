"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const temp_store_1 = require("./temp.store");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    usersService;
    emailService;
    jwtService;
    constructor(usersService, emailService, jwtService) {
        this.usersService = usersService;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async createOtp() {
        return Math.floor(100000 +
            Math.random() * 900000).toString();
    }
    async sendOtp(body) {
        const oldUser = await this.usersService
            .findByEmail(body.email);
        if (oldUser) {
            return {
                success: false,
                message: 'Email already exists',
            };
        }
        const otp = await this.createOtp();
        temp_store_1.tempUsers[body.email] = {
            ...body,
            otp,
            otp_expiry: Date.now() + 5 * 60 * 1000,
        };
        await this.emailService.sendOtp(body.email, otp);
        console.log('OTP:', otp);
        return {
            success: true,
            message: 'OTP_SENT',
        };
    }
    async verifyOtp(body) {
        const data = temp_store_1.tempUsers[body.email];
        if (!data) {
            return {
                success: false,
                message: 'User not found',
            };
        }
        if (data.otp !== body.otp) {
            return {
                success: false,
                message: 'Invalid OTP',
            };
        }
        return {
            success: true,
            message: 'OTP verified successfully',
        };
    }
    async register(body) {
        const oldUser = await this.usersService
            .findByEmail(body.email);
        if (oldUser) {
            return {
                success: false,
                message: 'Email already exists',
            };
        }
        const husband = await this.usersService.create({
            name: body.name,
            email: body.email,
            mobile: body.mobile,
            mobile_upi: body.mobile_upi,
            role: 'husband',
            is_verified: true,
        });
        if (body.wives &&
            body.wives.length) {
            for (const wife of body.wives) {
                await this.usersService
                    .create({
                    pid: husband._id,
                    name: wife.name,
                    email: wife.email,
                    mobile_upi: wife.mobile_upi,
                    role: 'wife',
                    is_verified: true,
                });
            }
        }
        delete temp_store_1.tempUsers[body.email];
        return {
            success: true,
            message: 'User registered successfully',
        };
    }
    async login(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const otp = await this.createOtp();
        temp_store_1.tempUsers[email + 'login'] = otp;
        await this.emailService.sendOtp(email, otp, true);
        return { message: 'OTP sent' };
    }
    async verifyLoginOtp(email, otp) {
        const storedOtp = temp_store_1.tempUsers[email + 'login'];
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
        delete temp_store_1.tempUsers[email + 'login'];
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        email_service_1.EmailService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map