import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from '../../user/user.service';
import { JwtAuthModule } from '../jwt/jwt.module';
import { GithubOauthService } from './github-oauth.service';
import { GithubOauthStrategy } from './github-oauth.strategy';
import { GithubOauthSerializer } from './serialization.provider';

@Module({
  imports: [JwtAuthModule],
  providers: [GithubOauthService, GithubOauthStrategy, GithubOauthSerializer, PrismaService, UserService],
})
export class GithubOauthModule {}
