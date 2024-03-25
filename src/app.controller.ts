import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService:AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //PAREI EM 14 MINUTOS DE AULA
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req){
   // return req.user
   return this.authService.login(req.user)
  }

}
