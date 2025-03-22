import { Repository } from 'typeorm';
import { UserTracking } from '../entity/user-tracking.entity';
import { UserCheckHistory } from '../entity/user-check-history.entity';
export declare class UsersService {
    private userTrackingRepository;
    private userCheckHistoryRepository;
    constructor(userTrackingRepository: Repository<UserTracking>, userCheckHistoryRepository: Repository<UserCheckHistory>);
    checkInUser(userAgent: string, checkinTime: string): Promise<UserTracking>;
    checkOutUser(userTrackingId: number, checkoutTime: string): Promise<UserTracking>;
    startBreak(userTrackingId: number, breakStart: string): Promise<UserCheckHistory>;
    resumeBreak(userTrackingId: number, resumeAt: string): Promise<UserTracking>;
}
