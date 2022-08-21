

import { ExecutionContext, Injectable, CanActivate, HttpException, HttpStatus } from '@nestjs/common';
 
@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const isAuthenticated = context.switchToHttp().getRequest().isAuthenticated();
    if (!isAuthenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return isAuthenticated;
  }
}