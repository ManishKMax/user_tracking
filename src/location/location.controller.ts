// src/controllers/location.controller.ts
import { Controller, Post, Get, Param, Query, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationTracking } from './entity/location-tracking.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

   // Get locations by userTrackingId, userId, and exact date
   @Get('getLocationByDate')
   async getLocationByDate(
     @Query('userId') userId: number,                  // The user ID
     @Query('selectedDate') selectedDate: string,      // The selected date in format YYYY-MM-DD
   ): Promise<LocationTracking[]> {
     return this.locationService.getLocationByDate( userId, selectedDate);
   }

  // Add location
  @Post('addLocation')
  async addLocation(
    @Body('userTrackingId') userTrackingId: number,
    @Body('lat') lat: string,
    @Body('long') long: string,
    @Body('userAgent') userAgent: string,
    @Body('projectId') projectId: bigint,
    @Body('userId') userId: number,
  ): Promise<LocationTracking> {
    return this.locationService.addLocation(userTrackingId, lat, long, userAgent, projectId, userId);
  }
}
