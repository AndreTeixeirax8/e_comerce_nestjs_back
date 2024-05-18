import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { 
  JwtStrategy,
  jwtConstants,
  LocalStrategy,
  AuthService,
 } from 'src/auth';

@Module({
  imports:[UsersModule,PassportModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'14d'}
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
