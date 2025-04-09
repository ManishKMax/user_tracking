import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingEvent } from './entities/tracking-event/tracking-event';
import { UserTrackingSummary } from './entities/user-tracking-summary/user-tracking-summary';
import { EventType } from './event-type.enum';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEvent)
    private trackingEventRepository: Repository<TrackingEvent>,

    @InjectRepository(UserTrackingSummary)
    private trackingSummaryRepository: Repository<UserTrackingSummary>,
  ) {}

  async createTrackingEvent(
    eventData: Partial<TrackingEvent>,
    userId: string,
    userAgent: string,
    projectId: string,
  ) {
    console.log('TimeStam11p:', eventData.timestamp);
    // Timestamp validation
    if (eventData.timestamp) {
      if (typeof eventData.timestamp === 'string') {
        eventData.timestamp = new Date(eventData.timestamp);
      } else if (!(eventData.timestamp instanceof Date)) {
        eventData.timestamp = new Date(eventData.timestamp);
      }
    } else {
      eventData.timestamp = new Date(); // Default to current timestamp
    }

    eventData.user_id = userId;
    eventData.project_id = projectId;
    eventData.user_agent = userAgent;
    eventData.timestamp = new Date(eventData.timestamp); // Re-assign timestamp to prevent mutation in repository save method

    const event = await this.trackingEventRepository.save(eventData);
    console.log('Saved Event:', event);

    const date = event.timestamp.toISOString().split('T')[0]; // Date for daily summary

    let summary = await this.trackingSummaryRepository.findOne({
      where: { user_id: userId, date },
    });

    if (!summary) {
      summary = this.trackingSummaryRepository.create({
        user_id: userId,
        project_id: projectId,
        user_agent: userAgent,
        created: event.timestamp,
        date,
        break_resume_time: [], // Initialize as empty array
      });
    }

    console.log('Event Type:', event.event_type);

    // Handling different event types
    switch (event.event_type) {
      case EventType.CheckIn:
         // Check if the checkin_checkout_time array exists and has entries
  if (summary.checkin_checkout_time && summary.checkin_checkout_time.length > 0) {
    const lastEntry = summary.checkin_checkout_time[summary.checkin_checkout_time.length - 1];
    // If the last entry's checkout is null, add a new check-in
    if (lastEntry.checkout === null) {
      summary.checkin_checkout_time.push({
        checkin: event.timestamp.toISOString(),
        checkout: null,
      });
    } else {
      // Add a new check-in if the last one is completed
      summary.checkin_checkout_time.push({
        checkin: event.timestamp.toISOString(),
        checkout: null,
      });
    }
  } else {
    // Initialize the array if it doesn't exist
    summary.checkin_checkout_time = [
      { checkin: event.timestamp.toISOString(), checkout: null },
    ];
  }
  summary.checkin = event.timestamp;
  break;
      case EventType.CheckOut:
        summary.checkout = event.timestamp;
        if (summary.checkin && summary.checkout) {
          const checkin = new Date(summary.checkin).getTime();
          const checkout = new Date(summary.checkout).getTime();
          summary.total_hours_worked = (checkout - checkin) / (1000 * 60); // in minutes
        }
        const lastcheckin = summary.checkin_checkout_time.find(b => b.checkout === null);
        if (lastcheckin) {
          lastcheckin.checkout = event.timestamp.toISOString();
          const startTime = new Date(lastcheckin.checkin).getTime();
              const endTime = new Date(lastcheckin.checkout).getTime();
              const breakDuration = (endTime - startTime) / (1000 * 60);
              summary.totalbreak += breakDuration;
        }
        break;

        case EventType.BreakTime:
            summary.break_resume_time.push({
              start: event.timestamp.toISOString(),
              end: null, // No issue now
            });
            break;
          
          case EventType.ResumeTime:
            const lastBreak = summary.break_resume_time.find(b => b.end === null);
            if (lastBreak) {
              lastBreak.end = event.timestamp.toISOString();
              const startTime = new Date(lastBreak.start).getTime();
              const endTime = new Date(lastBreak.end).getTime();
              const breakDuration = (endTime - startTime) / (1000 * 60);
              summary.totalbreak += breakDuration;
            }
            break;

      default:
        console.log('Unhandled event type:', event.event_type);
        break;
    }

    await this.trackingSummaryRepository.save(summary);
    return event;
  }
}
