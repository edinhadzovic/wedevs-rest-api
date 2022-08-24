import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../../users/users.service';
import { GithubOauthService } from './github-oauth.service';
import { GithubOauthStrategy } from './github-oauth.strategy';
import { GithubOauthSerializer } from './serialization.provider';

@Module({
  imports: [],
  providers: [GithubOauthService, GithubOauthStrategy, GithubOauthSerializer, PrismaService, UserService],
})
export class GithubOauthModule {}
