import { UserTracking } from './user-tracking.entity';
export declare class UserCheckHistory {
    id: number;
    checkin_time: Date;
    checkout_time: Date;
    break_start: Date;
    resume_at: Date;
    break_time: string;
    break_resume_time: string;
    user_agent: string;
    userTracking: UserTracking;
    user_tracking_id: number;
}
