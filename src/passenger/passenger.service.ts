import { Injectable } from '@nestjs/common';
import { PassengerDTO } from "./dto/passenger.dto";
import { IPassenger } from "../common/interfaces/passenger.interface";
import { InjectModel } from "@nestjs/mongoose";
import { PASSENGER } from "../common/models/models";
import { Model } from "mongoose";

@Injectable()
export class PassengerService {

  constructor(@InjectModel(PASSENGER.name) private readonly model:Model<IPassenger>) {
  }

  async create(passengerDTO: PassengerDTO): Promise<IPassenger>{
    const  newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }

}
