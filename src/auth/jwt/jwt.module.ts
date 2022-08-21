import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthService } from "./jwt.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: { expiresIn: configService.get("JWT_EXPIRES_IN") },
            }),
            inject: [ConfigService],
        })
    ],
    providers: [JwtStrategy, JwtAuthService],
    exports: [JwtAuthService]
})

export class JwtAuthModule {}