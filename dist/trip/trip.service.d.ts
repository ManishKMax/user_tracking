import { Repository } from 'typeorm';
import { Trip } from './entities/trip/trip.entity';
import { TripLocation } from './entities/trip-location/trip-location.entity';
import { StartTripDto } from './dto/start-trip.dto/start-trip.dto';
import { EndTripDto } from './dto/end-trip.dto/end-trip.dto';
import { TripLocationDto } from './dto/location.dto/location.dto';
import { GetTripLocationDto } from './dto/get-trip-location.dto/get-trip-location.dto';
export declare class TripService {
    private tripRepo;
    private locRepo;
    constructor(tripRepo: Repository<Trip>, locRepo: Repository<TripLocation>);
    startTrip(dto: StartTripDto, headers: any): Promise<{
        trip: {
            startDateTime: Date;
            startlocation: string;
            reason: string;
            locations: {
                latitude: string;
                longitude: string;
                distance: string;
            }[];
        };
    }>;
    endTrip(id: number, dto: EndTripDto): Promise<{
        trip: {
            startDateTime: Date;
            endDateTime: Date;
            startlocation: string;
            endlocation: string;
            total_distance: string;
            locations: {
                latitude: string;
                longitude: string;
                distance: string;
            }[];
        };
    }>;
    addLocation(dto: TripLocationDto): Promise<{
        locations: {
            latitude: string;
            longitude: string;
            distance: string;
        }[];
    }>;
    getTripLocationsByDate(dto: GetTripLocationDto): Promise<{
        trip: {
            startDateTime: Date;
            endDateTime: Date;
            startlocation: string;
            endlocation: string;
            total_distance: string;
            locations: {
                latitude: string;
                longitude: string;
                distance: string;
            }[];
        };
    }>;
    private calculateDistance;
    private updateTotalDistance;
}
