import { Injectable } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { Profile } from "passport-github2";

@Injectable()
export class JwtAuthService {
    constructor(private JwtService: JwtService) {}

    login(user: Profile) {
        const payload = {
            sub: user.id,
            username: user.username,
            photo: user.photos?.[0]?.value,
        }

        return {
            accessToken: this.JwtService.sign(payload),
        }
    }
}