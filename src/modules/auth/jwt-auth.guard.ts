import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    try {
      console.log(request.headers.authorization);
      const [bearer, token] = request.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
