import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEvent } from './entities/tracking-event/tracking-event';
import { UserTrackingSummary } from './entities/user-tracking-summary/user-tracking-summary';
import { TrackingService } from './user_track.service';
import { UserTrackController } from './user_track.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackingEvent, UserTrackingSummary]),
  ],
  controllers: [UserTrackController],
  providers: [TrackingService],
})
export class TrackingModule {}
