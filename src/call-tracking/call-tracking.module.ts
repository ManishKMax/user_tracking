import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallTracking } from './call-tracking.entity';
import { CallTrackingService } from './call-tracking.service';
import { CallTrackingController } from './call-tracking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CallTracking])],
  controllers: [CallTrackingController],
  providers: [CallTrackingService],
})
export class CallTrackingModule {}
