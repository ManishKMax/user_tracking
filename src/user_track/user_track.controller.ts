import { Body, Controller, Post, Headers, BadRequestException, Get, Query, UsePipes } from '@nestjs/common';
import { TrackingService } from './user_track.service';
import { TrackingEvent } from './entities/tracking-event';
import { ValidateHeadersPipe } from 'src/common/pipes/validate-headers.pipe';
import { CommonHeaderDto } from 'src/common/dto/common-headers.dto';

@Controller('user-track')
export class UserTrackController {
    constructor(private readonly trackingService: TrackingService) {}

    @Post('event')
    @UsePipes(new ValidateHeadersPipe(CommonHeaderDto))
    async createTrackingEvent(
      @Body() eventData: Partial<TrackingEvent>, // Data from the body
      @Headers() headers: CommonHeaderDto, // Headers will be validated and passed as a DTO
    ) {
      // Now, you can pass validated headers to your service
      return this.trackingService.createTrackingEvent(
        eventData,
        headers
      );
    }


    @Post('get-events')
    @UsePipes(new ValidateHeadersPipe(CommonHeaderDto)) // Validate headers
    async getTrackingEvents(
      @Body() body: { date?: string }, // Accepting 'date' in the body
      @Headers() headers: CommonHeaderDto, // Injecting validated headers as a DTO
    ) {
      
      // Default to today's date (UTC) if no date is provided
      const targetDate = body.date || new Date().toISOString().split('T')[0];
  
      const events = await this.trackingService.getEventsByUserProjectAndDate(
        headers,
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
