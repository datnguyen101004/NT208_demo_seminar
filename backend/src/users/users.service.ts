import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import {User} from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>,){}  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userModel.create(createUserDto);
    return newUser;  
  }

  async findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(user_id: string): Promise<User>  {
    const user = await this.userModel.findOne({user_id: user_id}).exec();
    if(!user) throw new Error("User not found");
    return user;
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({user_id:user_id}, updateUserDto).exec();
    if (!user) throw new Error("User not exist");
    return user;
  }

  async remove(user_id: string): Promise<any> {
    return this.userModel.findOneAndDelete({user_id:user_id}).exec();
  }
}
