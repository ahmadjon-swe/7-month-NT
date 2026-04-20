// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';
// import { Article } from './entities/article.entity';
// import { Auth } from 'src/modules/auth/entities/auth.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class ArticleService {
//   constructor(@InjectRepository(Article) private articleRepo: Repository<Article>){}

//   async create(createArticleDto: CreateArticleDto) {
//     const {title, content, userId} = createArticleDto
//     const article = this.articleRepo.create({title, content, userId})
//     return await this.articleRepo.save(article)
//   }

//   async findAll() {
//     return await this.articleRepo.find({include: [{model: Auth}]})
//   }

//   async findOne(id: number): Promise<Article> {
//     const foundArticle =  await this.articleRepo.findByPk(id)
//     if(!foundArticle) throw new NotFoundException("Article is not found")
//     return foundArticle
//   }

//   async update(id: number, updateArticleDto: UpdateArticleDto): Promise<{message: string}> {
//     const foundArticle =  await this.articleRepo.findByPk(id)
//     if(!foundArticle) throw new NotFoundException("Article is not found")

//     await this.articleRepo.update({...foundArticle, ...updateArticleDto}, {where: {id}})
//     return {message: "Article updated"};
//   }

//   async remove(id: number): Promise<{message: string}> {
//     const foundArticle =  await this.articleRepo.findByPk(id)
//     if(!foundArticle) throw new NotFoundException("Article is not found")

//     await this.articleRepo.destroy({where: {id}})
//     return {message: "Article deleted"}
//   }
// }
