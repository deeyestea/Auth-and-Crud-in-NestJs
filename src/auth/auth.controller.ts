import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGaurd } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn (@Body() signInDto: Record<string, any>): Promise<any> {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @UseGuards(AuthGaurd)
  @Get('profile')
  async getProfile (@Request() req) {
    return req.user;
  }
}
