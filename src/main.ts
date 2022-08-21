import { NestFactory } from '@nestjs/core';
import { createClient } from 'redis';
import { AppModule } from './app.module';
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as passport from 'passport';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

function bootstrapRediClient(config: ConfigService) {
  if (config.get('NODE_ENV') === 'production') {
    return createClient({url: config.get('REDIS_URL_TLS'), socket: {
      tls: true,
      rejectUnauthorized: false
    }});
  }
  return createClient({password: config.get('REDIS_PASSWORD'), legacyMode: true, url: config.get('REDIS_URL')});
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }, logger: console});


  const prismaService = app.get(PrismaService);
  const config = app.get(ConfigService);
  await prismaService.enableShutdownHooks(app);

  const redisClient = bootstrapRediClient(config);
  const RedisStore = connectRedis(session);
  
  redisClient.connect().then(( ) => console.log("Redis Client Connected Successfully")).catch(err => console.log(err));
  
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: config.get('SESSION_SECRET'),
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
