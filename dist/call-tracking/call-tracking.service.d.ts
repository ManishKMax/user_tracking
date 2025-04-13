import { Repository } from 'typeorm';
import { CallTracking } from './entities/call-tracking.entity';
export declare class CallTrackingService {
    private callRepo;
    constructor(callRepo: Repository<CallTracking>);
    create(data: Partial<CallTracking>): Promise<CallTracking>;
    findAll(user_id: string, project_id: string, from_date?: string, to_date?: string): Promise<CallTracking[]>;
    findOne(id: number, user_id: string, project_id: string): Promise<CallTracking | null>;
    remove(id: number, user_id: string, project_id: string): Promise<{
        deleted: boolean;
    }>;
}
