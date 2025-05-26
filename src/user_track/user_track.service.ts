import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TrackingEvent } from './entities/tracking-event';
import { CommonHeaderDto } from 'src/common/dto/common-headers.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEvent)
    private trackingEventRepository: Repository<TrackingEvent>,
  ) {}

 async createTrackingEvent(
  eventData: Partial<TrackingEvent>,
  eventHeader: CommonHeaderDto
) {
  try {
    // Validate and set timestamp
    if (eventData.timestamp) {
      if (typeof eventData.timestamp === 'string' || !(eventData.timestamp instanceof Date)) {
        eventData.timestamp = new Date(eventData.timestamp);
      }
    } else {
      eventData.timestamp = new Date(); // Default to current timestamp
    }

    // Assign metadata
    eventData.user_id = eventHeader.user_id;
    eventData.project_id = eventHeader.project_id;
    eventData.user_agent = eventHeader.user_agent;
    eventData.timestamp = new Date(eventData.timestamp); // Ensure date object

    // Save tracking event
    const event = await this.trackingEventRepository.save(eventData);
    console.log('✅ Tracking Event Saved:', event);

    return {
      status: true,
      data: event,
      message: '✅ Tracking event created successfully',
    };
  } catch (error) {
    console.error('❌ Error creating tracking event:', error);
    return {
      status: false,
      data: null,
      message: '❌ Failed to create tracking event',
    };
  }
}

  async getEventsByUserProjectAndDate(header: CommonHeaderDto, date: string) {
  try {
    const startOfDay = new Date(`${date}T00:00:00Z`);
    const endOfDay = new Date(`${date}T23:59:59Z`);

    const events = await this.trackingEventRepository.find({
      where: {
        user_id: header.user_id,
        project_id: header.project_id,
        timestamp: Between(startOfDay, endOfDay),
      },
      order: { timestamp: 'ASC' },
    });

    return {
      status: true,
      data: {
        date,
        total: events.length,
        events,
      },
      message: '✅ Events fetched successfully',
    };
  } catch (error) {
    return {
      status: false,
      data: {},
      message: error,
    };
  }
}

}
