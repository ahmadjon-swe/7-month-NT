import {BadRequestException, GatewayTimeoutException, Injectable} from "@nestjs/common";
import {CreateAuthDto} from "./dto/create-auth.dto";
import {UpdateAuthDto} from "./dto/update-auth.dto";
import {Auth} from "./entities/auth.entity";
import * as bcrypt from 'bcrypt'
import { Article } from "src/modules/article/entities/article.entity";
import { otpSender } from "src/shared/utils/node-mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { VerifyAuthDto } from "./dto/verify-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { ForgotPasswordAuthDto } from "./dto/forgotPassword-auth.dto";
import { VerifyForgotPasswordAuthDto } from "./dto/verify-forgotPassword-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepo:  Repository<Auth>,
    private jwtService: JwtService
  ) {}

  // register
  async register(createAuthDto: CreateAuthDto) {
    const {username, email, password} = createAuthDto;
    const foundedUser = await this.authRepo.findOne({
      where: 
         [{username}, {email}],
      
    });

    if(foundedUser) throw new BadRequestException("user already exist")
    
    const hash = await bcrypt.hash(password, 14)

    const otpTime = Date.now()+120000
    const otp = Array.from({length: 6}, ()=> Math.floor(Math.random()* 9)).join("")
    
    
    const user =  this.authRepo.create({username, email, password: hash, otp, otpTime});

    otpSender(otp, email)

    return await this.authRepo.save(user)
  }

  // login
  async login(dto: LoginAuthDto) {
    const {email, password} = dto as LoginAuthDto;
    const foundedUser = await this.authRepo.findOne({
      where:  {email}
    });

    if(!foundedUser) throw new BadRequestException("user is not exist")
    
    const check = await bcrypt.compare(password, foundedUser.password)

    if(!check) throw new BadRequestException("password is incorrect")

    const otpTime = Date.now()+120000
    const otp = Array.from({length: 6}, ()=> Math.floor(Math.random()* 9)).join("")
    
    await this.authRepo.update({otp, otpTime}, {id: foundedUser.id})

    otpSender(otp, email)

    return {message: `we send code to your email`}
  }

  // verify
  async verify(verifyAuthDto: VerifyAuthDto){
    const {email, otp}= verifyAuthDto as VerifyAuthDto
    const foundedUser = await this.authRepo.findOne({
      where:  {email}
    });

    if(!foundedUser) throw new BadRequestException("user is not exist")

    if(foundedUser.otp==="") throw new BadRequestException("Otp has not been sent, try to login")

    const chekOtp = /^\d{6}$/.test(otp)

    if(!chekOtp) throw new BadRequestException("wrong otp validation")

    if(foundedUser.otpTime && Date.now()>foundedUser.otpTime) throw new GatewayTimeoutException("otp time is expired")

    await this.authRepo.update({otp: "", otpTime: 0}, {id: foundedUser.id})

    const payload = {email: foundedUser.email, role: foundedUser.role}

    const token = await this.jwtService.signAsync(payload)

    return {message: "you have successfully logged in", token}
  }

  // forgot password
  async forgotPassword(dto: ForgotPasswordAuthDto){
    const {email} = dto as ForgotPasswordAuthDto

    const foundedUser = await this.authRepo.findOne({
      where:  {email}
    })

    if(!foundedUser) throw new BadRequestException("user is not exist")

    const otpTime = Date.now()+120000
    const otp = Array.from({length: 6}, ()=> Math.floor(Math.random()* 9)).join("")

    await this.authRepo.update({otp, otpTime}, {id: foundedUser.id})

    return {message: "we have send you email to change your password"}
  }



  // forgot password veify
  async forgotPasswordVerify(verifyForgotPasswordAuthDto: VerifyForgotPasswordAuthDto){
    const {email, otp, password}= verifyForgotPasswordAuthDto as VerifyForgotPasswordAuthDto
    const foundedUser = await this.authRepo.findOne({
      where:  {email}
    });

    if(!foundedUser) throw new BadRequestException("user is not exist")

    if(foundedUser.otp==="") throw new BadRequestException("Otp has not been sent, try to login")

    const chekOtp = /^\d{6}$/.test(otp)

    if(!chekOtp) throw new BadRequestException("wrong otp validation")

    if(foundedUser.otpTime && Date.now()>foundedUser.otpTime) throw new GatewayTimeoutException("otp time is expired")

    await this.authRepo.update({password, otp: "", otpTime: 0}, {id: foundedUser.id})

    const payload = {email: foundedUser.email, role: foundedUser.role}

    const token = await this.jwtService.signAsync(payload)

    return {message: "your password has been updated", token}
  }
}
