import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubOauthController } from './auth/github/github-oauth.controller';
import { GithubOauthModule } from './auth/github/github-oauth.module';
import { GithubOauthService } from './auth/github/github-oauth.service';
import { UserController } from './users/users.controller';
import { UserModule } from './users/users.module';
import { UserService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';
import { InterestsModule } from './interests/interests.module';
import { StoriesModule } from './stories/stories.module';

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
      REDIS_URL: Joi.string().required(),
      REDIS_URL_TLS: Joi.string().required(),
      REDIS_PASSWORD: Joi.string(),
      CORS_ORIGIN: Joi.string().required(),
      SESSION_SECRET: Joi.string().required(),
    }),
    isGlobal: true
  }), GithubOauthModule, UserModule, InterestsModule, StoriesModule],
  controllers: [AppController, GithubOauthController, UserController],
  providers: [AppService, UserService,GithubOauthService, UserService, PrismaService],
})
export class AppModule {}
