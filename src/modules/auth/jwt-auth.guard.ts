import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    try {

      const [bearer, token] = request.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token');
      }

      const verify = this.jwtService.verify(token);

      if ((verify.exp * 1000) <= Date.now()) {
        return false;
      }
      
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
