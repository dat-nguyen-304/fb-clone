import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto, LoginDto, User } from '@proto/auth';
import { AttachTokensInterceptor, RemoveTokensInterceptor } from '@handlers/token.interceptor';
import { JwtGuard } from './guard';
import { GetUser } from '@src/decorators';
import { Request } from 'express';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  @UseInterceptors(AttachTokensInterceptor)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseInterceptors(AttachTokensInterceptor)
  refresh(@Req() req: Request) {
    return this.authService.refresh(req.cookies.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(RemoveTokensInterceptor)
  @Post('logout')
  async logout(@Req() req: Request) {
    const { accessToken, refreshToken } = req.cookies;
    return await this.authService.logout(accessToken, refreshToken);
  }
}
