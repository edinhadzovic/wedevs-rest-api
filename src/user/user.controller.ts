import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from "express";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CookieAuthenticationGuard } from 'src/auth/shared/cookieAuthentication.guard';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(CookieAuthenticationGuard)
  async getloggedUser(@Req() req: Request) {
    const user = req.user as any;
    return user;
  }

  @Patch('me')
  @UseGuards(CookieAuthenticationGuard)
  async updateUser(@Req() req: Request, @Body() updateUserDto: Prisma.UserCreateInput) {
    const user = req.user as any;
    return this.userService.update(user.id, updateUserDto);
  }

  @Get()
  @UseGuards(CookieAuthenticationGuard)
  findAll(@Req() req: Request) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
