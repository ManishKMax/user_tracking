import { EventType } from 'src/user_track/event-type.enum';
export declare class TrackingEvent {
    id: number;
    user_id: string;
    timestamp: Date;
    event_type: EventType;
    created: Date;
    user_agent: string;
    project_id: string;
}
