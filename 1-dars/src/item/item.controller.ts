import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";

@Controller()
export class ItemController {
  constructor(private itemService: ItemService) {}

  @HttpCode(200)
  @Get()
  getItems() {
    return this.itemService.getItems();
  }

  @HttpCode(200)
  @Get()
  getOneItem(@Param("id") id: string) {
    return this.itemService.getOneItem(+id);
  }

  @HttpCode(201)
  @Patch()
  updateItem(@Param("id") id: string, @Body() item: Partial<CreateItemDto>) {
    return this.itemService.updateItem(+id, item);
  }

  @HttpCode(201)
  @Post()
  addItem(@Body() item: CreateItemDto) {
    return this.itemService.addItem(item);
  }

  @HttpCode(200)
  @Delete()
  deleteItem(@Param("id") id: string) {
    return this.itemService.deleteItem(+id);
  }
}
