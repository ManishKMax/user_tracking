import { UserCheckHistory } from './user-check-history.entity';
export declare class UserTracking {
    id: number;
    checkin_time: string;
    checkout_time: string;
    user_agent: string;
    created: Date;
    break_time: string;
    break_resume_time: string;
    userCheckHistories: UserCheckHistory[];
}
