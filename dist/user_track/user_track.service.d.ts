import { Repository } from 'typeorm';
import { TrackingEvent } from './entities/tracking-event/tracking-event';
import { UserTrackingSummary } from './entities/user-tracking-summary/user-tracking-summary';
export declare class TrackingService {
    private trackingEventRepository;
    private trackingSummaryRepository;
    constructor(trackingEventRepository: Repository<TrackingEvent>, trackingSummaryRepository: Repository<UserTrackingSummary>);
    createTrackingEvent(eventData: Partial<TrackingEvent>, userId: string, userAgent: string, projectId: string): Promise<Partial<TrackingEvent> & TrackingEvent>;
}
