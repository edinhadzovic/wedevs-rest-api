import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from "express";
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Prisma, User } from '@prisma/client';
import {slug} from "cuid";
import { CookieAuthenticationGuard } from 'src/auth/shared/cookieAuthentication.guard';


@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @UseGuards(CookieAuthenticationGuard)
  create(@Body() createStoryDto: Prisma.StoryCreateInput, @Req() req: Request) {
    const user = req.user as User;
    return this.storiesService.create(createStoryDto, user, slug());
  }

  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.storiesService.findOne(slug);
  }

  @Post(':slug/like')
  likeStory(@Param('slug') slug: string, @Req() req: Request) {
    const user = req.user as User;
    return this.storiesService.likeStory(slug, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: Prisma.StoryUpdateInput) {
    return this.storiesService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storiesService.remove(+id);
  }

  @Get('user/:id')
  findStoriesByUser(@Param('id') id: string) {}
}
