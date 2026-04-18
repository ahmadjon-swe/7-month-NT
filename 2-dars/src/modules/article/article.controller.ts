// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ArticleService } from './article.service';
// import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';

// @Controller('article')
// export class ArticleController {
//   constructor(private readonly articleService: ArticleService) {}

//   @Post("add_article")
//   create(@Body() createArticleDto: CreateArticleDto) {
//     return this.articleService.create(createArticleDto);
//   }

//   @Get("get_all_atricles")
//   findAll() {
//     return this.articleService.findAll();
//   }

//   @Get('get_articel/:id')
//   findOne(@Param('id') id: string) {
//     return this.articleService.findOne(+id);
//   }

//   @Patch('update_article/:id')
//   update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
//     return this.articleService.update(+id, updateArticleDto);
//   }

//   @Delete('delete_article/:id')
//   remove(@Param('id') id: string) {
//     return this.articleService.remove(+id);
//   }
// }
