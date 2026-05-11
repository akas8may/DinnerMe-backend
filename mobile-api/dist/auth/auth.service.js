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
const users_service_1 = require("../users/users.service");
const temp_store_1 = require("./temp.store");
let AuthService = class AuthService {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
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
        const otp = Math.floor(100000 +
            Math.random() * 900000).toString();
        temp_store_1.tempUsers[body.email] = {
            ...body,
            otp,
            otp_expiry: Date.now() + 5 * 60 * 1000,
        };
        console.log('OTP:', otp);
        await this.emailService.sendOtp(data.email, otp);
        return {
            success: true,
            message: 'OTP sent successfully',
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
        const husband = await this.usersService.create({
            name: data.name,
            email: data.email,
            mobile_upi: data.mobile_upi,
            role: 'husband',
            is_verified: true,
        });
        if (data.wives &&
            data.wives.length) {
            for (const wife of data.wives) {
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
            message: 'Registration successful',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map