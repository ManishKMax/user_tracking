import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { UserTracking } from '../entity/user-tracking.entity';
import { UserCheckHistory } from '../entity/user-check-history.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserTracking)
    private userTrackingRepository: Repository<UserTracking>,

    @InjectRepository(UserCheckHistory)
    private userCheckHistoryRepository: Repository<UserCheckHistory>,
  ) {}

  // 1. When user checks in for the first time
  async checkInUser(userAgent: string, checkinTime: string): Promise<UserTracking> {
    try {
      // Create a new UserTracking entry
      const userTracking = this.userTrackingRepository.create({
        checkin_time: checkinTime,
        user_agent: userAgent,
      });

      const savedUserTracking = await this.userTrackingRepository.save(userTracking);

      // Create UserCheckHistory entry for this check-in
      const userCheckHistory = this.userCheckHistoryRepository.create({
        checkin_time: checkinTime,
        userTracking: savedUserTracking,
        user_tracking_id: savedUserTracking.id,
        user_agent: userAgent,
      });

      await this.userCheckHistoryRepository.save(userCheckHistory);
      return savedUserTracking;
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while checking in user', error);
    } finally {
      console.log('checkInUser process completed');
    }
  }

  // 2. When user checks out
  async checkOutUser(userTrackingId: number, checkoutTime: string): Promise<UserTracking> {
    let userTracking: UserTracking | null;
    try {
      // Find the UserTracking record
      userTracking = await this.userTrackingRepository.findOne({ where: { id: userTrackingId } });
      if (!userTracking) {
        throw new NotFoundException(`UserTracking with ID ${userTrackingId} not found.`);
      }

      // Update the checkout time
      userTracking.checkout_time = checkoutTime;

      await this.userTrackingRepository.save(userTracking);

      // Update the UserCheckHistory for this checkout
      const userCheckHistory = await this.userCheckHistoryRepository.findOne({
        where: { user_tracking_id: userTrackingId, checkout_time: IsNull() },
      });

      if (userCheckHistory) {
        // Update the checkout time for UserCheckHistory
        userCheckHistory.checkout_time = new Date(checkoutTime);
        await this.userCheckHistoryRepository.save(userCheckHistory);
      }

      return userTracking;
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while checking out user', error);
    } finally {
      console.log('checkOutUser process completed');
    }
  }

  // 3. When user goes on a break
  async startBreak(userTrackingId: number, breakStart: string): Promise<UserCheckHistory> {
    let userTracking: UserTracking | null;
    try {
      // Find the UserTracking record
      userTracking = await this.userTrackingRepository.findOne({ where: { id: userTrackingId } });
      if (!userTracking) {
        throw new NotFoundException(`UserTracking with ID ${userTrackingId} not found.`);
      }

      // Create a UserCheckHistory entry for the break start
      const userCheckHistory = this.userCheckHistoryRepository.create({
        break_start: breakStart,
        userTracking: userTracking,
        user_tracking_id: userTracking.id,
        user_agent: userTracking.user_agent,
      });

      return await this.userCheckHistoryRepository.save(userCheckHistory);
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while starting break', error);
    } finally {
      console.log('startBreak process completed');
    }
  }

  // 4. When user resumes from break
  async resumeBreak(userTrackingId: number, resumeAt: string): Promise<UserTracking> {
    let userTracking: UserTracking | null;
    try {
      // Find the UserTracking record
      userTracking = await this.userTrackingRepository.findOne({ where: { id: userTrackingId } });
      if (!userTracking) {
        throw new NotFoundException(`UserTracking with ID ${userTrackingId} not found.`);
      }

      // Find the UserCheckHistory record where the break has started
      const userCheckHistory = await this.userCheckHistoryRepository.findOne({
        where: { user_tracking_id: userTrackingId, break_start: Not(IsNull()) },
      });

      if (userCheckHistory) {
        // Update the resume time for the break
        userCheckHistory.resume_at = new Date(resumeAt);
        await this.userCheckHistoryRepository.save(userCheckHistory);
      }

      // Calculate total break time and update UserTracking
      let totalBreakTime = '0'; // Placeholder logic for break time calculation
      const breakEntries = await this.userCheckHistoryRepository.find({
        where: { user_tracking_id: userTrackingId, break_start: Not(IsNull()) },
      });

      // Example logic for break time calculation (customize as needed)
      totalBreakTime = breakEntries.reduce((total, entry) => {
        // Logic to calculate break time goes here (you need a way to calculate the break duration)
        return total; // This should include logic to calculate the break time in hours, minutes, etc.
      }, totalBreakTime);

      // Update UserTracking with break time and resume time
      userTracking.break_time = totalBreakTime;
      userTracking.break_resume_time = resumeAt;
      await this.userTrackingRepository.save(userTracking);

      return userTracking;
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while resuming break', error);
    } finally {
      console.log('resumeBreak process completed');
    }
  }
}
