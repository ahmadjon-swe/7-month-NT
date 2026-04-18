import { IsEmail, IsNumberString, IsString} from "class-validator";

export class VerifyAuthDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsNumberString()
  otp!: string
}
