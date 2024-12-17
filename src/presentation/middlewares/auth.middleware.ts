import {
  Injectable,
  HttpException,
  HttpStatus,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenAdapter } from '@src/infra/adapters/token-adapter';

@Injectable()
export class AuthMiddleware implements CanActivate {
  constructor(private readonly jwtTokenAdapter: JwtTokenAdapter) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    const [bearer, token] = authHeader.split(' ');
    if (!bearer) {
      throw new UnauthorizedException('Invalid Token');
    }

    const verifiedToken = this.jwtTokenAdapter.verifyToken(token);
    if (!verifiedToken)
      throw new HttpException(
        'Token validation failed',
        HttpStatus.UNAUTHORIZED,
      );

    return true;
  }
}
