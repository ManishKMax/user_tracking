// src/call-tracking/call-tracking.controller.ts
import {
  Controller,
  Post,
  Headers,
  Body,
} from '@nestjs/common';
import { CallTrackingService } from './call-tracking.service';
import { CreateCallTrackingDto } from './dto/create-call-tracking.dto';
import { FindCallTrackingDto } from './dto/find-call-tracking.dto';

@Controller('call-tracking')
export class CallTrackingController {
  constructor(private readonly callTrackingService: CallTrackingService) {}

  @Post()
  create(
    @Headers('user_id') user_id: string,
    @Headers('project_id') project_id: string,
    @Headers('user_agent') user_agent: string,
    @Body() body: CreateCallTrackingDto,
  ) {
    const data = {
      ...body,
      user_id,
      project_id,
      user_agent,
    };
    return this.callTrackingService.create(data);
  }

  @Post('find')
  findAll(
    @Headers('user_id') user_id: string,
    @Headers('project_id') project_id: string,
    @Body() dateRangeDto: FindCallTrackingDto,
  ) {
    const { from_date, to_date } = dateRangeDto;
    return this.callTrackingService.findAll(user_id, project_id, from_date, to_date);
  }

  @Post('find-one')
  findOne(
    @Headers('user_id') user_id: string,
    @Headers('project_id') project_id: string,
    @Body('id') id: number,
  ) {
    return this.callTrackingService.findOne(id, user_id, project_id);
  }

  @Post('delete')
  remove(
    @Headers('user_id') user_id: string,
    @Headers('project_id') project_id: string,
    @Body('id') id: number,
  ) {
    return this.callTrackingService.remove(id, user_id, project_id);
  }
}
