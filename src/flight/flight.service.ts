import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { FLIGHT } from "../common/models/models";
import { Model } from "mongoose";
import { IFlight } from "../common/interfaces/flight.inteface";
import { FlightDTO } from "./dto/flight.dto";

@Injectable()
export class FlightService {

  constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) {
  }

  async create (flightDTO: FlightDTO): Promise<IFlight>{
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

}
