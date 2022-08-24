import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';

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

  create(createUserDto: CreateUsersDto) {
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

  async findAllSuggest(user: User) {
    const findUserInterests = await this.prisma.userInterest.findMany({ where: { userId: user.id }, select: {interestId: true} });
    const flatFindUserInterests = findUserInterests.map((interest: any) => interest.interestId);
    const findAllUserWithSameInterests = await this.prisma.user.findMany({include: {interests: true}, where: { interests: { some: { interestId: {in: flatFindUserInterests}} }, id: {not: user.id} }});
    return findAllUserWithSameInterests;
  }
}
