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
import { CommonHeaderDto } from 'src/common/dto/common-headers.dto';

@Controller('call-tracking')
export class CallTrackingController {
  constructor(private readonly callTrackingService: CallTrackingService) {}

  @Post()
  create(
    @Headers() headers: CommonHeaderDto,
    @Body() body: CreateCallTrackingDto,
  ) {

    const data = {
      ...body,
      headers
    };
    return this.callTrackingService.create(data);
  }

  @Post('find')
  findAll(
    @Headers() headers: CommonHeaderDto,
    @Body() dateRangeDto: FindCallTrackingDto,
  ) {
    const { from_date, to_date } = dateRangeDto;
    return this.callTrackingService.findAll(headers.user_id, headers.project_id, from_date, to_date);
  }

  @Post('find-one')
  findOne(
    @Headers() headers: CommonHeaderDto,
    @Body('id') id: number,
  ) {
    return this.callTrackingService.findOne(id, headers.user_id, headers.project_id);
  }

  @Post('delete')
  remove(
    @Headers() headers: CommonHeaderDto,
    @Body('id') id: number,
  ) {
    return this.callTrackingService.remove(id, headers.user_id, headers.project_id,);
  }
}
