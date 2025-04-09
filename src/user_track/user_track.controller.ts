import { Body, Controller, Post, Headers, BadRequestException } from '@nestjs/common';
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
}
