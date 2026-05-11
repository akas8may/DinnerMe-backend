import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
