import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { GithubOauthService } from './github-oauth.service';


@Injectable()
export class GithubOauthSerializer extends PassportSerializer {
  constructor(private readonly authService: GithubOauthService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: { id: number; role: string }) => void) {
    console.log("serialzier", user)
    done(null, { id: user.id, role: user.role });
  }

  deserializeUser(payload: { id: string; }, done: (err: Error, user: Omit<any, 'password'>) => void) {
    console.log("deserialzier", payload)
    const user = this.authService.findById(payload.id);
    
    done(null, user);
  }
}