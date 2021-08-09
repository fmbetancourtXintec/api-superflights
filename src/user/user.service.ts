import { Injectable } from '@nestjs/common';
import { UserDTO } from "./dto/user.dto";
import { IUser } from "../common/interfaces/user.inteface";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { USER } from "../common/models/models";
import { Model } from "mongoose";

@Injectable()
export class UserService {

  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {
  }

  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<IUser>{
    // try {
      const hash = await this.hashPassword(userDTO.password);
      const newUser = new this.model({...userDTO, password: hash});
      return await newUser.save();
    // }catch (e) {
    //   console.log("aqui!");
    // }
  }
}
