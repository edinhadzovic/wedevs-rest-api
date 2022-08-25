import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import { Request } from "express";
import { UserService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CookieAuthenticationGuard } from 'src/auth/shared/cookieAuthentication.guard';
import { Prisma, User } from '@prisma/client';

@Controller('users')
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
  findAll(
    @Req() req: Request,
    @Query('suggest') suggest: boolean,
  ) {
    const user = req.user as User;
    if (suggest) {
      return this.userService.findAllSuggest(user);
    }

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

  @Put("/:username/follow")
  @UseGuards(CookieAuthenticationGuard)
  async follow(@Param('username') id: string, @Req() req: Request) {
    return this.userService.follow(id, req.user as User);
  }

  @Put("/:username/unfollow")
  @UseGuards(CookieAuthenticationGuard)
  async unfollow(@Param('username') id: string, @Req() req: Request) {
    return this.userService.unfollow(id, req.user as User);
  }
}
