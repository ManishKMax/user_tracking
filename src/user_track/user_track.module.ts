import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEvent } from './entities/tracking-event';
import { TrackingService } from './user_track.service';
import { UserTrackController } from './user_track.controller';
import { SummarySchedulerService } from './summary-scheduler.service.ts/summary-scheduler.service.ts.service';
import { UserTrackingSummary } from './entities/user-tracking-summary';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackingEvent, UserTrackingSummary]),
  ],
  controllers: [UserTrackController],
  providers: [TrackingService, SummarySchedulerService],
})
export class TrackingModule {}
