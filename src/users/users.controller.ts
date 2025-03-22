import { Controller, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { UserTracking } from './entity/user-tracking.entity';
import { UserCheckHistory } from './entity/user-check-history.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. Check in user for the first time
  @Post('checkin')
  async checkInUser(
    @Body('userAgent') userAgent: string,
    @Body('checkinTime') checkinTime: string,
  ): Promise<UserTracking> {
    return this.usersService.checkInUser(userAgent, checkinTime);
  }

  // 2. Check out user
  @Post('checkout/:userTrackingId')
  async checkOutUser(
    @Param('userTrackingId') userTrackingId: number,
    @Body('checkoutTime') checkoutTime: string,
  ): Promise<UserTracking> {
    return this.usersService.checkOutUser(userTrackingId, checkoutTime);
  }

  // 3. Start break
  @Post('break/start/:userTrackingId')
  async startBreak(
    @Param('userTrackingId') userTrackingId: number,
    @Body('breakStart') breakStart: string,
  ): Promise<UserCheckHistory> {
    return this.usersService.startBreak(userTrackingId, breakStart);
  }

  // 4. Resume break
  @Post('break/resume/:userTrackingId')
  async resumeBreak(
    @Param('userTrackingId') userTrackingId: number,
    @Body('resumeAt') resumeAt: string,
  ): Promise<UserTracking> {
    return this.usersService.resumeBreak(userTrackingId, resumeAt);
  }
}
