import { UsersService } from './provider/users.service';
import { UserTracking } from './entity/user-tracking.entity';
import { UserCheckHistory } from './entity/user-check-history.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    checkInUser(userAgent: string, checkinTime: string): Promise<UserTracking>;
    checkOutUser(userTrackingId: number, checkoutTime: string): Promise<UserTracking>;
    startBreak(userTrackingId: number, breakStart: string): Promise<UserCheckHistory>;
    resumeBreak(userTrackingId: number, resumeAt: string): Promise<UserTracking>;
}
