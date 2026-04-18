import { BaseEntity } from "src/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: "article"})
export class Article extends BaseEntity {
  @Column({
    type: "string",
    nullable: false
  })
  username!: string

  @Column({
    type: "string",
    nullable: false
  })
  email!: string

  @Column({
    type: "string",
    nullable: false
  })
  password!: string

  @Column({
    type: "string",
    nullable: false
  })
  otp!: string

  
}
