import { Strategy as CustomStrategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME, UserServiceClient } from '@proto/auth';
import { lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { RedisService } from '@src/redis/redis.service';
import { TokenService } from '@token/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(CustomStrategy, 'jwt') implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject('user') private client: ClientGrpc,
    private redisService: RedisService,
    private token: TokenService
  ) {
    super();
  }

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  error(err: Error): void {
    console.log(err.message);
  }

  async validate(req: Request) {
    const token = req.cookies?.accessToken;
    if (!token) throw new UnauthorizedException('Token is invalid or has been revoked');
    const isTokenValid = await this.redisService.isValidToken(token, 'access');
    if (!isTokenValid) throw new UnauthorizedException('Token is invalid or has been revoked');
    const decoded = await this.token.decodeToken(token);
    const response = await lastValueFrom(this.userService.findOneUser({ id: decoded.id }));
    const user = response.data;
    delete user.password;
    return user;
  }
}
