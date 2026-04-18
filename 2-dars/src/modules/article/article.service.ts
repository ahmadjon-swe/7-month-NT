// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';
// import { Article } from './entities/article.entity';
// import { InjectModel } from '@nestjs/sequelize';
// import { Auth } from 'src/modules/auth/entities/auth.entity';

// @Injectable()
// export class ArticleService {
//   constructor(@InjectModel(Article) private articleModel: typeof Article){}

//   async create(createArticleDto: CreateArticleDto):Promise<Article> {
//     const {title, content, userId} = createArticleDto
//     return await this.articleModel.create({title, content, userId}, {returning: true})
//   }

//   async findAll(): Promise<Article[]> {
//     return await this.articleModel.findAll({include: [{model: Auth}]})
//   }

//   async findOne(id: number): Promise<Article> {
//     const foundArticle =  await this.articleModel.findByPk(id)
//     if(!foundArticle) throw new NotFoundException("Article is not found")
//     return foundArticle
//   }

//   async update(id: number, updateArticleDto: UpdateArticleDto): Promise<{message: string}> {
//     const foundArticle =  await this.articleModel.findByPk(id)
//     if(!foundArticle) throw new NotFoundException("Article is not found")

//     await this.articleModel.update({...foundArticle, ...updateArticleDto}, {where: {id}})
//     return {message: "Article updated"};
//   }

//   async remove(id: number): Promise<{message: string}> {
//     const foundArticle =  await this.articleModel.findByPk(id)
//     if(!foundArticle) throw new NotFoundException("Article is not found")

//     await this.articleModel.destroy({where: {id}})
//     return {message: "Article deleted"}
//   }
// }
