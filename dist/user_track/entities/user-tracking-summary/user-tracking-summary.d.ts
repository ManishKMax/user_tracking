export declare class UserTrackingSummary {
    id: number;
    user_id: string;
    project_id: string;
    user_agent: string;
    checkin: Date;
    checkout: Date;
    checkin_checkout_time: {
        checkin: string;
        checkout: string | null;
    }[];
    break_resume_time: {
        start: string;
        end: string | null;
    }[];
    totalbreak: number;
    total_hours_worked: number;
    date: string;
    created: Date;
}
