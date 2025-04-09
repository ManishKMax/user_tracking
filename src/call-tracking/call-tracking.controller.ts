import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CallTrackingService } from './call-tracking.service';
import { CallTracking } from './call-tracking.entity';

@Controller('call-tracking')
export class CallTrackingController {
  constructor(private readonly callTrackingService: CallTrackingService) {}

  @Post()
  create(@Body() createData: CallTracking) {
    return this.callTrackingService.create(createData);
  }

  @Get()
  findAll() {
    return this.callTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.callTrackingService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<CallTracking>) {
    return this.callTrackingService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.callTrackingService.remove(id);
  }
}
