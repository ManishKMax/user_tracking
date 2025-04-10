import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TrackingEvent } from './entities/tracking-event/tracking-event';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEvent)
    private trackingEventRepository: Repository<TrackingEvent>,
  ) {}

  async createTrackingEvent(
    eventData: Partial<TrackingEvent>,
    userId: string,
    userAgent: string,
    projectId: string,
  ) {
    // Validate and set timestamp
    if (eventData.timestamp) {
      if (typeof eventData.timestamp === 'string') {
        eventData.timestamp = new Date(eventData.timestamp);
      } else if (!(eventData.timestamp instanceof Date)) {
        eventData.timestamp = new Date(eventData.timestamp);
      }
    } else {
      eventData.timestamp = new Date(); // Default to current timestamp
    }

    // Assign metadata
    eventData.user_id = userId;
    eventData.project_id = projectId;
    eventData.user_agent = userAgent;
    eventData.timestamp = new Date(eventData.timestamp); // Re-assign to ensure immutability

    // Save tracking event
    const event = await this.trackingEventRepository.save(eventData);
    console.log('✅ Tracking Event Saved:', event);
    return event;
  }

  
  async getEventsByUserProjectAndDate(userId: string, projectId: string, date: string) {
    const startOfDay = new Date(`${date}T00:00:00Z`);
    const endOfDay = new Date(`${date}T23:59:59Z`);
  
    return this.trackingEventRepository.find({
      where: {
        user_id: userId,
        project_id: projectId,
        timestamp: Between(startOfDay, endOfDay),
      },
      order: { timestamp: 'ASC' },
    });
  }

}
