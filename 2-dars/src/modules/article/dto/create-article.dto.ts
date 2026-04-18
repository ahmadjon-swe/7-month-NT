import { IsNumber, IsString, Length } from "class-validator"

export class CreateArticleDto {
  @IsString()
  @Length(3, 20)
  title!: string

  @IsString()
  @Length(15, 1200)
  content!: string

  @IsNumber()
  userId: number
}
