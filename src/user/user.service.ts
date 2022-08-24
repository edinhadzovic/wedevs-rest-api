import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import console from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  async findOrCreate(u: any) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: u.email },
      })

      if (!user) {

        return await this.prisma.user.create({
          data: {
            nodeId: u.nodeId,
            displayName: u.displayName,
            username: u.username,
            profileUrl: u.profileUrl,
            email: u.emails?.[0]?.value,
            avatar: u.photos?.[0]?.value,
            provider: u.provider,
          }
        })
      }

      return user;
    } catch (error) {
      // meaningful error handling
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: any) {
    const {interests, ...user} = updateUserDto;
  
    await this.prisma.user.update({
      data: user,
      where: {
        id,
      }
    })

    const enchandledInterests = interests.map((interest: any) => {
      return {
        interestId: interest.id,
        userId: user.id
      }
    });

    await this.prisma.userInterest.createMany({
      data: enchandledInterests,
      skipDuplicates: true
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
