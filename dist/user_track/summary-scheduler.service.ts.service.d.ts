import { Repository } from 'typeorm';
import { TrackingEvent } from './entities/tracking-event/tracking-event';
import { UserTrackingSummary } from './entities/user-tracking-summary/user-tracking-summary';
export declare class SummarySchedulerService {
    private trackingEventRepository;
    private summaryRepository;
    constructor(trackingEventRepository: Repository<TrackingEvent>, summaryRepository: Repository<UserTrackingSummary>);
    handleCron(): Promise<void>;
}
