import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Trip } from './entities/trip/trip.entity';
import { TripLocation } from './entities/trip-location/trip-location.entity';
import { StartTripDto } from './dto/start-trip.dto/start-trip.dto';
import { EndTripDto } from './dto/end-trip.dto/end-trip.dto';
import { TripLocationDto } from './dto/location.dto/location.dto';
import { GetTripLocationDto } from './dto/get-trip-location.dto/get-trip-location.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private tripRepo: Repository<Trip>,
    @InjectRepository(TripLocation) private locRepo: Repository<TripLocation>,
  ) {}

  // Start a new trip and save locations
  async startTrip(dto: StartTripDto, headers: any) {
    try {
      const trip = this.tripRepo.create({
        user_id: headers.user_id,
        project_id: headers.project_id,
        user_agent: headers.user_agent,
        startDateTime: dto.startDateTime,
        startlocation: dto.startLocation,
        reason: dto.reason,
        created: new Date(),
      });

      const savedTrip = await this.tripRepo.save(trip);

      // Add the starting location (distance is 0 as it's the starting point)
      await this.locRepo.save({
        tripid: savedTrip.id,
        latitude: dto.latitude,
        longitude: dto.longitude,
        distance: '0',
        created: new Date(),
      });

      // Return only relevant data, excluding id, user_id, project_id, created
      return {
        trip: {
          startDateTime: savedTrip.startDateTime,
          startlocation: savedTrip.startlocation,
          reason: savedTrip.reason,
          locations: [
            {
              latitude: dto.latitude,
              longitude: dto.longitude,
              distance: '0',
            },
          ],
        },
      };
    } catch (error) {
      throw new Error(`Failed to start trip: ${error.message}`);
    }
  }

  // End a trip and update the location with total distance
  async endTrip(id: number, dto: EndTripDto) {
    try {
      const trip = await this.tripRepo.findOne({ where: { id } });
      if (!trip) throw new NotFoundException('Trip not found');

      // Fetch last location and calculate the distance from there to the end location
      const lastLoc = await this.locRepo.findOne({
        where: { tripid: id },
        order: { created: 'DESC' },
      });

      if (!lastLoc) throw new NotFoundException('No locations found for this trip');

      const distance = this.calculateDistance(
        +lastLoc!.latitude,
        +lastLoc!.longitude,
        +dto.latitude,
        +dto.longitude,
      );

      // Update the trip with the end time and location, and add the distance
      trip.endDateTime = dto.endDateTime;
      trip.endlocation = dto.endLocation;
      trip.total_distance = this.updateTotalDistance(trip.total_distance, distance);

      await this.tripRepo.save(trip);

      // Add the final location at the end of the trip
      await this.locRepo.save({
        tripid: id,
        latitude: dto.latitude,
        longitude: dto.longitude,
        distance: distance.toFixed(2),
        created: new Date(),
      });

      // Return only relevant data, excluding id, user_id, project_id, created
      return {
        trip: {
          startDateTime: trip.startDateTime,
          endDateTime: trip.endDateTime,
          startlocation: trip.startlocation,
          endlocation: trip.endlocation,
          total_distance: trip.total_distance,
          locations: [
            {
              latitude: dto.latitude,
              longitude: dto.longitude,
              distance: distance.toFixed(2),
            },
          ],
        },
      };
    } catch (error) {
      throw new Error(`Failed to end trip: ${error.message}`);
    }
  }

  // Add location to the trip with distance calculation
  async addLocation(dto: TripLocationDto) {
    try {
      // Find the last location for the trip
      const lastLoc = await this.locRepo.findOne({
        where: { tripid: dto.tripId },
        order: { created: 'DESC' },
      });

      if (!lastLoc) throw new NotFoundException('No locations found for this trip');

      // Calculate the distance from the last location to the new location
      const distance = this.calculateDistance(
        +lastLoc!.latitude,
        +lastLoc!.longitude,
        +dto.latitude,
        +dto.longitude,
      );

      // Save the new location with the calculated distance
      await this.locRepo.save({
        tripid: dto.tripId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        distance: distance.toFixed(2),
        created: new Date(),
      });

      // Update the trip's total distance with the new calculated distance
      const trip = await this.tripRepo.findOne({ where: { id: dto.tripId } });
      if (trip) {
        trip.total_distance = this.updateTotalDistance(trip.total_distance, distance);
        await this.tripRepo.save(trip);
      } else {
        throw new NotFoundException('Trip not found');
      }

      // Return only relevant data for the locations (excluding other fields like id)
      return {
        locations: [
          {
            latitude: dto.latitude,
            longitude: dto.longitude,
            distance: distance.toFixed(2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to add location: ${error.message}`);
    }
  }

  // Method to find trip locations by user_id, project_id, and date
  async getTripLocationsByDate(dto: GetTripLocationDto) {
    try {
      const { user_id, project_id, date } = dto;

      // Create start and end range for the date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      // Find trip in that date range
      const trip = await this.tripRepo.findOne({
        where: {
          user_id,
          project_id,
          startDateTime: Between(startOfDay, endOfDay),
        },
      });

      if (!trip) {
        throw new NotFoundException('No trip found for the given user, project, and date');
      }

      // Get all locations for that trip
      const locations = await this.locRepo.find({
        where: { tripid: trip.id },
        order: { created: 'ASC' },
      });

      return {
        trip: {
          startDateTime: trip.startDateTime,
          endDateTime: trip.endDateTime,
          startlocation: trip.startlocation,
          endlocation: trip.endlocation,
          total_distance: trip.total_distance,
          locations: locations.map(loc => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
            distance: loc.distance,
          })),
        },
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Helper method to calculate the distance between two latitudes and longitudes
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const toRad = (v: number) => (v * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Distance in kilometers
  }

  // Helper method to update the total distance of the trip
  private updateTotalDistance(current: string, added: number): string {
    const curr = parseFloat(current || '0');
    return (curr + added).toFixed(2); // Total distance in kilometers
  }
}
