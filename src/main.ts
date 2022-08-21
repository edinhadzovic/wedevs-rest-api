import { NestFactory } from '@nestjs/core';
import { createClient } from 'redis';
import { AppModule } from './app.module';
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as passport from 'passport';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    origin: "http://localhost:3001",
    credentials: true
  }, logger: console});


  const prismaService = app.get(PrismaService);
  const config = app.get(ConfigService);
  await prismaService.enableShutdownHooks(app);

  const redisClient = createClient({password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81', legacyMode: true});
  const RedisStore = connectRedis(session);
  
  redisClient.connect();
  
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: "iopajsfiojasiofjio",
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session());
  await app.listen(config.get('PORT'));
}
bootstrap();
