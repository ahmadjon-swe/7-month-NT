import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      port: 5432,
      username: "postgres",
      host: "localhost",
      database: String(process.env.DB_NAME as string),
      password: String(process.env.DB_PASSWORD as string),
      entities: [AuthModule], 
      synchronize: true,
      logging: false  
    }),
    // ArticleModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}