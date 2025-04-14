import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingEvent } from '../entities/tracking-event';
import { UserTrackingSummary } from '../entities/user-tracking-summary';
import { EventType } from '../event-type.enum';
import { Between } from 'typeorm';

@Injectable()
export class SummarySchedulerService {
  constructor(
    @InjectRepository(TrackingEvent)
    private trackingEventRepository: Repository<TrackingEvent>,

    @InjectRepository(UserTrackingSummary)
    private summaryRepository: Repository<UserTrackingSummary>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    console.log('⏰ Running summary generation job...');

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Get all events in the last hour
    const events = await this.trackingEventRepository.find({
      where: {
        timestamp: Between(oneHourAgo, now),
      },
      order: { timestamp: 'ASC' },
    });

    const groupedByUserAndDate = new Map<string, TrackingEvent[]>();

    for (const event of events) {
      const dateKey = event.timestamp.toISOString().split('T')[0];
      const key = `${event.user_id}_${dateKey}`;
      if (!groupedByUserAndDate.has(key)) {
        groupedByUserAndDate.set(key, []);
      }
      groupedByUserAndDate.get(key)!.push(event);
    }

    for (const [key, userEvents] of groupedByUserAndDate.entries()) {
      const [user_id, date] = key.split('_');

      let summary = await this.summaryRepository.findOne({
        where: { user_id, date },
      });

      if (!summary) {
        summary = this.summaryRepository.create({
          user_id,
          project_id: userEvents[0].project_id,
          user_agent: userEvents[0].user_agent,
          date,
          created: userEvents[0].timestamp,
          checkin_checkout_time: [],
          break_resume_time: [],
          totalbreak: 0,
        });
      }

      for (const event of userEvents) {
        switch (event.event_type) {
          case EventType.CheckIn:
            summary.checkin = event.timestamp;
            summary.checkin_checkout_time.push({
              checkin: event.timestamp.toISOString(),
              checkout: null,
            });
            break;

          case EventType.CheckOut:
            summary.checkout = event.timestamp;
            const lastCheck = summary.checkin_checkout_time.find(c => c.checkout === null);
            if (lastCheck) {
              lastCheck.checkout = event.timestamp.toISOString();
              const duration = new Date(lastCheck.checkout).getTime() - new Date(lastCheck.checkin).getTime();
              summary.total_hours_worked = (duration) / (1000 * 60);
              summary.totalbreak += duration / (1000 * 60);
            }
            break;

          case EventType.BreakTime:
            summary.break_resume_time.push({
              start: event.timestamp.toISOString(),
              end: null,
            });
            break;

          case EventType.ResumeTime:
            const lastBreak = summary.break_resume_time.find(b => b.end === null);
            if (lastBreak) {
              lastBreak.end = event.timestamp.toISOString();
              const duration = new Date(lastBreak.end).getTime() - new Date(lastBreak.start).getTime();
              summary.totalbreak += duration / (1000 * 60);
            }
            break;
        }
      }

      await this.summaryRepository.save(summary);
    }

    console.log('✅ Summary update complete');
  }
}
