import { Trip } from '../trip/trip.entity';
export declare class TripLocation {
    id: number;
    tripid: number;
    latitude: string;
    longitude: string;
    distance: string;
    created: Date;
    trip: Trip;
}
