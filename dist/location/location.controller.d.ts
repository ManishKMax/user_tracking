import { LocationService } from './location.service';
import { LocationTracking } from './entity/location-tracking.entity';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getLocationByDate(userId: number, selectedDate: string): Promise<LocationTracking[]>;
    addLocation(userTrackingId: number, lat: string, long: string, userAgent: string, projectId: bigint, userId: number): Promise<LocationTracking>;
}
