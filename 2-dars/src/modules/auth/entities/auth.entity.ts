import { BaseEntity } from "src/database/entities/base.entity";
import { UserRole } from "src/shared/enums/roles.enum";
import { Column, Entity } from "typeorm";

@Entity({name: "auth"})
export class Auth extends BaseEntity{
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
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role!: string

  @Column({
    type: "string",
    nullable: false
  })
  password!: string

  @Column({
    type: "string",
    nullable: true
  })
  otp?: string

  @Column({type: "bigint", nullable: true})
  otpTime?: number
}
