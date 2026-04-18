import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { ForgotPasswordAuthDto } from './dto/forgotPassword-auth.dto';
import { VerifyForgotPasswordAuthDto } from './dto/verify-forgotPassword-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Get("login")
  login(@Body() loginAuthDto: LoginAuthDto){
    return this.authService.login(loginAuthDto)
  }

  @Patch("verify")
  verify(@Body() verifyAuthDto: VerifyAuthDto){
    return this.authService.verify(verifyAuthDto)
  }

  @Get("forgot_password")
  forgotPassword(@Body() forgotPasswordAuthDto: ForgotPasswordAuthDto){
    return this.authService.forgotPassword(forgotPasswordAuthDto)
  }

  @Patch("forgot_password")
  forgotPasswordVerify(@Body() verifyForgotPasswordAuthDto: VerifyForgotPasswordAuthDto){
    return this.authService.forgotPasswordVerify(verifyForgotPasswordAuthDto)
  }
}
