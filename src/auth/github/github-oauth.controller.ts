import { Controller, Get, UseGuards, Req, Res, Session } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {Request, Response} from "express";
import { GithubOauthGuard } from "./github-oauth.guard";
import { GithubOauthService } from "./github-oauth.service";


@Controller("/auth/github")
export class GithubOauthController {
    constructor(
        private config: ConfigService,
        private service: GithubOauthService
    ) {}

    @Get()
    @UseGuards(GithubOauthGuard)
    githubAuth() {
        // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
		// automatically provisioned for us when we extended the passport-github strategy.
		// The Guard initiates the passport-github flow.
    }

    @Get("/callback")
    @UseGuards(GithubOauthGuard)
    async githubAuthCallback(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
        @Session() session: any
    ) {
        const user = req.user as any;

        //todo: should be moved to some helper service.
        const formattedUser = {
            nodeId: user.nodeId,
            displayName: user.displayName,
            username: user.username,
            profileUrl: user.profileUrl,
            email: user.emails?.[0]?.value,
            avatar: user.photos?.[0]?.value,
            provider: user.provider,
            bio: user._json.bio.toString(),
        }

        const dbUser = await this.service.findOrCreate(formattedUser);

        //updated the user even if there is nothing to updated.
        await this.service.updateUser(dbUser, formattedUser);

        await this.service.logIn(req, dbUser);
        const coreWebApp = this.config.get<string>("CORE_WEB_APP");
        const redirectUrl = coreWebApp + (dbUser.newUser ? "welcome" : "home");
        res.redirect(redirectUrl);        
    }
}