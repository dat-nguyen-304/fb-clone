import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export type TokenPayload = {
  id: string;
  fullName: string;
};

@Injectable()
export class TokenService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signToken(payload: TokenPayload) {
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: this.config.get('JWT_SECRET')
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_REFRESH_SECRET')
    });

    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(token: string) {
    return await this.jwt.verifyAsync(token, {
      secret: this.config.get('JWT_REFRESH_SECRET')
    });
  }

  async decodeToken(token: string) {
    return await this.jwt.decode(token);
  }
}
