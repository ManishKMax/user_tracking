import { Body, Controller, Post, Headers, BadRequestException, Get, Query } from '@nestjs/common';
import { TrackingService } from './user_track.service';
import { TrackingEvent } from './entities/tracking-event/tracking-event';

@Controller('user-track')
export class UserTrackController {
    constructor(private readonly trackingService: TrackingService) {}

    @Post('event')
    createTrackingEvent(
      @Body() eventData: Partial<TrackingEvent>,
      @Headers('user_id') userId: string,
      @Headers('user_agent') userAgent: string,
      @Headers('project_id') projectId: string,
    ) {
      // Header validation
      if (!userId || !userAgent || !projectId) {
        throw new BadRequestException('Headers cannot have null values');
      }
  
      return this.trackingService.createTrackingEvent(
        eventData,
        userId,
        userAgent,
        projectId,
      );
    }


    @Get('events')
    async getTrackingEvents(
      @Headers('user_id') userId: string,
      @Headers('project_id') projectId: string,
      @Query('date') date?: string,
    ) {
      // Validate headers
      if (!userId || !projectId) {
        throw new BadRequestException('user_id and project_id headers are required');
      }
  
      // Default to today's date (UTC) if no date is provided
      const targetDate = date || new Date().toISOString().split('T')[0];
  
      const events = await this.trackingService.getEventsByUserProjectAndDate(
        userId,
        projectId,
        targetDate,
      );
  
      return {
        message: '✅ Events fetched successfully',
        date: targetDate,
        total: events.length,
        events,
      };
    }
    
    
}
