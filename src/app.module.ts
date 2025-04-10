import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './common/config/configuration';
import { TrackingEvent } from './user_track/entities/tracking-event/tracking-event';
import { UserTrackingSummary } from './user_track/entities/user-tracking-summary/user-tracking-summary';
import { TrackingModule } from './user_track/user_track.module';
import { ScheduleModule } from '@nestjs/schedule';

// Validation for environment variables
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
    // ConfigModule with validation schema
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidationSchema, // Validate environment variables
      isGlobal: true, // Make config globally available
    }),

    // TypeORM configuration using async for dynamic loading from environment
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access ConfigService
      useFactory: async (configService: ConfigService) => {
        try {
          // Access environment variables with validation
          const dbConfig = {
            type: configService.get<string>('database.type') as 'mysql', // MySQL type
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            username: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            database: configService.get<string>('database.database'),
            entities: [TrackingEvent, UserTrackingSummary],
            synchronize: true, // Use false in production and handle migrations
          };

          // Ensure all required fields are set in the config (you can also validate the structure here)
          if (!dbConfig.host || !dbConfig.username || !dbConfig.password || !dbConfig.database) {
            throw new Error('Missing required database configuration');
          }

          return dbConfig;
        } catch (error) {
          console.error('Error while loading database configuration:', error.message);
          process.exit(1); // Exit the application if database configuration is invalid
        }
      },
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    TrackingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
