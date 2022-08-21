import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubOauthController } from './auth/github/github-oauth.controller';
import { GithubOauthModule } from './auth/github/github-oauth.module';
import { GithubOauthService } from './auth/github/github-oauth.service';
import { JwtAuthModule } from './auth/jwt/jwt.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
      PORT: Joi.number().default(3000),
      GITHUB_CLIENT_ID: Joi.string().required(),
      GITHUB_CLIENT_SECRET: Joi.string().required(),
      GITHUB_CALLBACK_URL: Joi.string().required(),
      GITHUB_SCOPE: Joi.string().required(),
      CORE_WEB_APP: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.string().default("10m"),
    }),
    isGlobal: true
  }), GithubOauthModule, JwtAuthModule, UserModule],
  controllers: [AppController, GithubOauthController, UserController],
  providers: [AppService, UserService,GithubOauthService, UserService, PrismaService],
})
export class AppModule {}
