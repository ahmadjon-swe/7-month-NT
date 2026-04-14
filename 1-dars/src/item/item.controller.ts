import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @HttpCode(200)
  @Get('get_all_items')
  getItems() {
    return this.itemService.getItems();
  }

  @HttpCode(200)
  @Get('get_one_item/:id')
  getOneItem(@Param('id') id: string) {
    return this.itemService.getOneItem(+id);
  }

  @HttpCode(201)
  @Patch('update_item/:id')
  updateItem(@Param('id') id: string, @Body() item: Partial<CreateItemDto>) {
    return this.itemService.updateItem(+id, item);
  }

  @HttpCode(201)
  @Post('add_item')
  addItem(@Body() item: CreateItemDto) {
    return this.itemService.addItem(item);
  }

  @HttpCode(200)
  @Delete('delete_item/:id')
  deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(+id);
  }
}
