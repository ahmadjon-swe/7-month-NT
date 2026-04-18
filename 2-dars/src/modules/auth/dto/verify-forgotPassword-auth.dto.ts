import { IsEmail, IsNumberString, IsString, Length} from "class-validator";

export class VerifyForgotPasswordAuthDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsNumberString()
  otp!: string

  @IsString()
  @Length(6, 18)
  password!: string;
}
