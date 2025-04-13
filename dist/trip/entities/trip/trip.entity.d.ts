import { TripLocation } from '../trip-location/trip-location.entity';
export declare class Trip {
    id: number;
    user_id: string;
    project_id: string;
    user_agent: string;
    startDateTime: Date;
    endDateTime: Date;
    startlocation: string;
    endlocation: string;
    total_distance: string;
    reason: string;
    created: Date;
    locations: TripLocation[];
}
