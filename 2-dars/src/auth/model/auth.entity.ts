import { BeforeCreate, BeforeUpdate, HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Article } from "src/article/model/article.entity";
import * as bcrypt from 'bcrypt';

@Table({tableName: "auth", timestamps: true})
export class Auth extends Model {
  // @Column({
  //   type: DataType.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true
  // })
  // id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  otp?: string

  @HasMany(()=>Article)
  articles?: Article[]

  // @BeforeCreate
  // static async hashPassword(user: Auth){
  //   user.password = await bcrypt.hash(user.password, 12)
  // }

// @BeforeCreate
// @BeforeUpdate
// static async hashPassword(user: Auth){
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, 12)
//   }
// }
}
