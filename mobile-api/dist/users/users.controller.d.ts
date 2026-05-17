import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    deleteUser(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
