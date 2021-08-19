import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { FLIGHT } from "../common/models/models";
import { Model } from "mongoose";
import { IFlight } from "../common/interfaces/flight.inteface";
import { FlightDTO } from "./dto/flight.dto";
import { IPassenger } from "../common/interfaces/passenger.interface";
import { PassengerDTO } from "../passenger/dto/passenger.dto";

@Injectable()
export class FlightService {

  constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) {
  }

  async create (flightDTO: FlightDTO): Promise<IFlight>{
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]>{
    return await this.model.find();
  }

  async findOne(id: string): Promise<IFlight>{
    return await this.model.findById(id);
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight>{
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

}
