import { Repository } from 'typeorm';
import { TrackingEvent } from './entities/tracking-event/tracking-event';
export declare class TrackingService {
    private trackingEventRepository;
    constructor(trackingEventRepository: Repository<TrackingEvent>);
    createTrackingEvent(eventData: Partial<TrackingEvent>, userId: string, userAgent: string, projectId: string): Promise<Partial<TrackingEvent> & TrackingEvent>;
    getEventsByUserProjectAndDate(userId: string, projectId: string, date: string): Promise<TrackingEvent[]>;
}
