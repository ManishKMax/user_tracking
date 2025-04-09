import { Repository } from 'typeorm';
import { CallTracking } from './call-tracking.entity';
export declare class CallTrackingService {
    private callTrackingRepository;
    constructor(callTrackingRepository: Repository<CallTracking>);
    create(callTracking: CallTracking): Promise<CallTracking>;
    findAll(): Promise<CallTracking[]>;
    findOne(id: number): Promise<CallTracking>;
    update(id: number, updateData: Partial<CallTracking>): Promise<void>;
    remove(id: number): Promise<void>;
}
