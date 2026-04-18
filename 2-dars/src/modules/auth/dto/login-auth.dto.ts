import { PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class LoginAuthDto extends PickType(CreateAuthDto, ["email" , "password"]) {}
