import { Controller, Post, Body, Param, Headers, BadRequestException, UsePipes } from '@nestjs/common';
import { TripService } from './trip.service';
import { StartTripDto } from './dto/start-trip.dto';
import { EndTripDto } from './dto/end-trip.dto';
import { TripLocationDto } from './dto/location.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post('startTrip')
  startTrip(@Body() dto: StartTripDto, @Headers() headers) {
    return this.tripService.startTrip(dto, headers);
  }

  @Post('endTrip/:id')
  endTrip(@Param('id') id: number, @Body() dto: EndTripDto) {
    return this.tripService.endTrip(id, dto);
  }

  @Post('addlocation')
  addLocation(@Body() dto: TripLocationDto) {
    return this.tripService.addLocation(dto);
  }

  // Endpoint to get trip locations by user_id, project_id from headers and date from body (using POST method)
  @Post('locationsByDate')
  async getTripLocationsByDate(
    @Headers('user_id') user_id: string,
    @Headers('project_id') project_id: string,
    @Body() body: { date: string },
  ) {
    try {
      return await this.tripService.getTripLocationsByDate({
        user_id,
        project_id,
        date: body.date,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
}
