import { PickType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class ForgotPasswordAuthDto extends PickType(CreateAuthDto, ["email"]) {}
