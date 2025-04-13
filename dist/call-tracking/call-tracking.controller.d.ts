import { CallTrackingService } from './call-tracking.service';
import { CreateCallTrackingDto } from './dto/create-call-tracking.dto';
import { FindCallTrackingDto } from './dto/find-call-tracking.dto';
export declare class CallTrackingController {
    private readonly callTrackingService;
    constructor(callTrackingService: CallTrackingService);
    create(user_id: string, project_id: string, user_agent: string, body: CreateCallTrackingDto): Promise<import("./entities/call-tracking.entity").CallTracking>;
    findAll(user_id: string, project_id: string, dateRangeDto: FindCallTrackingDto): Promise<import("./entities/call-tracking.entity").CallTracking[]>;
    findOne(user_id: string, project_id: string, id: number): Promise<import("./entities/call-tracking.entity").CallTracking | null>;
    remove(user_id: string, project_id: string, id: number): Promise<{
        deleted: boolean;
    }>;
}
