import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: "article"})
export class Article extends BaseEntity {
  @Column({
    type: "string",
    nullable: false
  })
  title!: string

  @Column({
    type: "string",
    nullable: false
  })
  content!: string

  @Column({
    type: "number", 
    nullable: false
  })
  userId!: number
}
