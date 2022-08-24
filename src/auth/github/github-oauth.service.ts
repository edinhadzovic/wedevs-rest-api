import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../../users/users.service';

@Injectable()
export class GithubOauthService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    logIn(req: Request, user: any): any {
        return new Promise((resolve, reject) => {
            req.logIn(user, (error) => {
                if (error) reject(error);
                resolve(true);
            })
        })
    }

    async findOrCreate(user: Prisma.UserCreateInput) {
        try {
            const foundUser = await this.prisma.user.findFirst({
                where: { email: user.email }, 
                include: {interests: true}
            });

            if (!foundUser) {
                return await this.prisma.user.create({
                    data: user,
                    include: {interests: true}
                  })
            }

            return foundUser;
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(user: any, newUser: any) {
        try {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    nodeId: newUser.nodeId,
                    displayName: newUser.displayName,
                    username: newUser.username,
                    profileUrl: newUser.profileUrl,
                    email: newUser.email,
                    avatar: newUser.avatar,
                    provider: newUser.provider,
                    bio: newUser.bio,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    async findById(id: string) {
        const {interests, ...user} = await this.prisma.user.findFirst({where: {id}, include: {interests: { include: {interest: true} }}});
        return {
            ...user,
            interests: interests.map(interest => interest.interest),
        }
    }
}
