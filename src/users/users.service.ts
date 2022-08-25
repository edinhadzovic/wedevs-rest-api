import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { findUsersWithSameInterestsQuery } from './users.queries';

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
    const findAllUserWithSameInterests = 
    await this.prisma.user.findMany(findUsersWithSameInterestsQuery(user.id, flatFindUserInterests));
    return findAllUserWithSameInterests;
  }

  async follow(id: string, user: User) {
    return this.prisma.follows.create({
      data: {
        followerId: user.id,
        followingId: id,
      }
    })
  }

  async unfollow(id: string, user: User) {
    return this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: id
        }
      }
    });
  }
}
