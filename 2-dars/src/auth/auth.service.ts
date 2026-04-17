import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateAuthDto} from "./dto/create-auth.dto";
import {UpdateAuthDto} from "./dto/update-auth.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Auth} from "./model/auth.entity";
import {Op} from "sequelize";
import * as bcrypt from 'bcrypt'
import { Article } from "src/article/model/article.entity";
import { otpSender } from "src/utility/node-mailer";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}

  async register(createAuthDto: CreateAuthDto) {
    const {username, email, password} = createAuthDto;
    const foundedUser = await this.authModel.findOne({
      where: {
        [Op.or]: [{username}, {email}],
      },
    });

    if(foundedUser) throw new BadRequestException("user already exist")
    
    const hash = await bcrypt.hash(password, 14)

    const otp = Array.from({length: 6}, ()=> Math.floor(Math.random()* 9)).join("")
    
    otpSender(otp, email)

    return await this.authModel.create({username, email, password: hash, otp}, {returning: true});
  }

  async login(updateAuthDto: UpdateAuthDto) {
    const {username, email, password} = updateAuthDto;
    const foundedUser = await this.authModel.findOne({
      where: {
        [Op.or]: [{username}, {email}],
      },
    });

    if(foundedUser) throw new BadRequestException("user already exist")
    
    const hash = await bcrypt.hash(password, 14)

    const otp = Array.from({length: 6}, ()=> Math.floor(Math.random()* 9)).join("")
    
    otpSender(otp, email)

    return await this.authModel.create({username, email, password: hash, otp}, {returning: true});
  }

  async findAll() {
    return await this.authModel.findAll({attributes: {exclude: ['password']}, include: [{model: Article}]})
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
