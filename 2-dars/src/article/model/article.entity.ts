import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Auth } from "src/auth/model/auth.entity";

@Table({tableName: "article", timestamps: true})
export class Article extends Model {
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
    allowNull: false
  })
  otp!: string

  @ForeignKey(()=>Auth)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number

  @BelongsTo(()=>Auth)
  user_id!: number
}
