import { CallTrackingService } from './call-tracking.service';
import { CallTracking } from './call-tracking.entity';
export declare class CallTrackingController {
    private readonly callTrackingService;
    constructor(callTrackingService: CallTrackingService);
    create(createData: CallTracking): Promise<CallTracking>;
    findAll(): Promise<CallTracking[]>;
    findOne(id: number): Promise<CallTracking>;
    update(id: number, updateData: Partial<CallTracking>): Promise<void>;
    remove(id: number): Promise<void>;
}
