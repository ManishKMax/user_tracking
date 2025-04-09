import { Repository } from 'typeorm';
import { LocationTracking } from './entity/location-tracking.entity';
export declare class LocationService {
    private locationRepository;
    constructor(locationRepository: Repository<LocationTracking>);
    getLocationByDate(userId: number, selectedDate: string): Promise<LocationTracking[]>;
    addLocation(userTrackingId: number, lat: string, long: string, userAgent: string, projectId: bigint, userId: number): Promise<LocationTracking>;
}
