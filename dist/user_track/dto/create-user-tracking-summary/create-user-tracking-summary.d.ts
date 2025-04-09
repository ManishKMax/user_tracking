export declare class CreateUserTrackingSummaryDto {
    user_id: string;
    project_id: string;
    user_agent: string;
    created: Date;
    checkin?: Date;
    checkout?: Date;
    totalbreak: number;
    break_resume_time?: Date;
    total_hours_worked: number;
    date: string;
}
