import { IsEmail, IsString, Length } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @Length(5, 15)
  username!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 18)
  password!: string;
}

export class UpdateAuthDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 18)
  password!: string;
}
