import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { Trip } from './entities/trip/trip.entity';
import { TripLocation } from './entities/trip-location/trip-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, TripLocation]), // Register entities with TypeORM
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
