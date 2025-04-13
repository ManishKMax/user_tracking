import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './common/config/configuration';

// Existing entities
import { TrackingEvent } from './user_track/entities/tracking-event/tracking-event';
import { UserTrackingSummary } from './user_track/entities/user-tracking-summary/user-tracking-summary';
import { CallTracking } from './call-tracking/entities/call-tracking.entity';

// Trip-related modules and entities
import { TripModule } from './trip/trip.module';
import { Trip } from './trip/entities/trip/trip.entity';
import { TripLocation } from './trip/entities/trip-location/trip-location.entity';

// Other modules
import { TrackingModule } from './user_track/user_track.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CallTrackingModule } from './call-tracking/call-tracking.module';

// Validation schema for environment variables
export const configurationValidationSchema = Joi.object({
  DATABASE_TYPE: Joi.string().valid('mysql', 'postgres').required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});

@Module({
  imports: [
    // ConfigModule to load environment variables with validation
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidationSchema,
      isGlobal: true,
    }),

    // Database connection using TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        try {
          const dbConfig = {
            type: configService.get<string>('database.type') as 'mysql',
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            username: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            database: configService.get<string>('database.database'),
            entities: [
              TrackingEvent,
              UserTrackingSummary,
              CallTracking,
              Trip,
              TripLocation,
            ],
            synchronize: true, // Turn off in production
          };

          if (!dbConfig.host || !dbConfig.username || !dbConfig.password || !dbConfig.database) {
            throw new Error('Missing required database configuration');
          }

          return dbConfig;
        } catch (error) {
          console.error('Error while loading database configuration:', error.message);
          process.exit(1); // Exit app on error
        }
      },
      inject: [ConfigService],
    }),

    // Feature Modules
    TrackingModule,
    CallTrackingModule,
    ScheduleModule.forRoot(),
    TripModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
