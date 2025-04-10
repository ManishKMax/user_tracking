import { TrackingService } from './user_track.service';
import { TrackingEvent } from './entities/tracking-event/tracking-event';
export declare class UserTrackController {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    createTrackingEvent(eventData: Partial<TrackingEvent>, userId: string, userAgent: string, projectId: string): Promise<Partial<TrackingEvent> & TrackingEvent>;
    getTrackingEvents(userId: string, projectId: string, date?: string): Promise<{
        message: string;
        date: string;
        total: number;
        events: TrackingEvent[];
    }>;
}
