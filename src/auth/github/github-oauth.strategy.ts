import { Injectable } from "@nestjs/common";
import { Profile, Strategy } from "passport-github2";
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private config: ConfigService) {
        super({
            clientID: config.get('GITHUB_CLIENT_ID'),
            clientSecret: config.get('GITHUB_CLIENT_SECRET'),
            callbackURL: config.get('GITHUB_CALLBACK_URL'),
            scope: config.get<string[]>('GITHUB_SCOPE')
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
        return done(null, profile);
    }
}