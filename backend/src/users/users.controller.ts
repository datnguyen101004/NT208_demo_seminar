import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    const newUser = new CreateUserDto;
    newUser.user_id = randomUUID().substring(0,4);
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.username = createUserDto.username;
    return this.usersService.create(newUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @Patch(':user_id')
  update(@Param('user_id') user_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
