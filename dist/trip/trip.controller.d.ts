import { TripService } from './trip.service';
import { StartTripDto } from './dto/start-trip.dto/start-trip.dto';
import { EndTripDto } from './dto/end-trip.dto/end-trip.dto';
import { TripLocationDto } from './dto/location.dto/location.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
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
    getTripLocationsByDate(user_id: string, project_id: string, body: {
        date: string;
    }): Promise<{
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
}
