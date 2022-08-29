import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StoriesController],
  providers: [StoriesService, PrismaService]
})
export class StoriesModule {}
