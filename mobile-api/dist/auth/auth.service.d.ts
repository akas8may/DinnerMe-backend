import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private readonly usersService;
    private readonly emailService;
    private jwtService;
    constructor(usersService: UsersService, emailService: EmailService, jwtService: JwtService);
    createOtp(): Promise<string>;
    sendOtp(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    register(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    login(email: string): Promise<{
        message: string;
    }>;
    verifyLoginOtp(email: string, otp: string): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, import("../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
