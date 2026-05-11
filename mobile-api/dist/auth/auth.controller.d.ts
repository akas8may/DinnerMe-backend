import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
