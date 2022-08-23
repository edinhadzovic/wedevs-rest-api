import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InterestsService {

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all interests`;
  }

  findAllBySearch(search: string) {
    return this.prisma.interest.findMany({ where: {
      name: { contains: search, mode: 'insensitive' }
    }})
  }
}
