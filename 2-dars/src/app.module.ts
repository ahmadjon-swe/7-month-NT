import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: "postgres",
      port: 5432,
      username: "postgres",
      host: "localhost",
      database: String(process.env.DB_NAME as string),
      password: String(process.env.DB_PASSWORD as string),
      // models: [Auth, Article],
      autoLoadModels: true,
      synchronize: true,
      logging: false  
    }),
    ArticleModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}