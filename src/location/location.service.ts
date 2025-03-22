// src/services/location.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationTracking } from './entity/location-tracking.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationTracking)
    private locationRepository: Repository<LocationTracking>,
  ) {}

 // Get locations by userTrackingId, userId, and exact date (ignoring time)
 async getLocationByDate(
    userId: number, 
    selectedDate: string,  // The selected date in format YYYY-MM-DD
  ): Promise<LocationTracking[]> {
    return this.locationRepository
      .createQueryBuilder('location')
      .where('location.userId = :userId', { userId })
      .andWhere('CAST(location.created AS DATE) = :selectedDate', { selectedDate })
      .getMany();  // Retrieves all matching records for that date
  }

  // Add location
  async addLocation(
    userTrackingId: number,
    lat: string,
    long: string,
    userAgent: string,
    projectId: bigint,
    userId: number,
  ): Promise<LocationTracking> {
    const location = this.locationRepository.create({
      userTrackingId,
      lat,
      long,
      created: new Date(),
      userAgent,
      projectId,
      userId,
    });
    return await this.locationRepository.save(location);
  }
}
