import { AuthService } from './auth.service';
import { I18nContext } from 'nestjs-i18n';
export declare class AuthController {
    private readonly authService;
    getMe(req: any): any;
    constructor(authService: AuthService);
    sendOtp(body: any, i18n: I18nContext): Promise<any>;
    verifyOtp(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    register(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    login(body: any): Promise<{
        message: string;
    }>;
    verifyLoginOtp(body: any): Promise<{
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
