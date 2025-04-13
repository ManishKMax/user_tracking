export declare enum CallType {
    INCOMING = "Incoming",
    OUTGOING = "Outgoing",
    MISSED = "Missed",
    REJECTED = "Rejected"
}
export declare class CallTracking {
    id: number;
    user_id: string;
    call_type: CallType;
    recording_url: string;
    duration: string;
    user_agent: string;
    project_id: string;
    create_date: Date;
}
