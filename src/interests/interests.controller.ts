import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { CookieAuthenticationGuard } from 'src/auth/shared/cookieAuthentication.guard';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get()
  @UseGuards(CookieAuthenticationGuard)
  findAll(@Query('search') search: string) {
    console.log(search);
    if (search) {
      return this.interestsService.findAllBySearch(search);
    }

    return this.interestsService.findAll();
  }
}
