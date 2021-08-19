import { Body, Controller, Get, Post } from "@nestjs/common";
import { FlightService } from "./flight.service";
import { FlightDTO } from "./dto/flight.dto";

@Controller('api/v1/flight')
export class FlightController {

  constructor(private readonly flightService: FlightService) {
  }

  @Post()
  create(@Body() flightDTO: FlightDTO){
    return this.flightService.create(flightDTO);
  }

  @Get()
  findAll(){
    return this.flightService.findAll();
  }

}
