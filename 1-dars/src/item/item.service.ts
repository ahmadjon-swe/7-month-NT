import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  private Items: CreateItemDto[] = [
    {
      id: 1,
      title: 'map',
    },
    {
      id: 2,
      title: 'apapppp',
    },
  ];

  getItems() {
    return this.Items;
  }

  getOneItem(id: number | string) {
    const foundedItem = this.Items.find((v) => v.id == id);
    if (!foundedItem) throw new NotFoundException('iten is not found');
    return foundedItem;
  }

  addItem(item: CreateItemDto) {
    if (this.Items.some((v) => v.id === item.id)) {
      throw new BadRequestException('item is already exist');
    }

    this.Items.push(item);
    return 'created';
  }

  updateItem(id: number | string, item: Partial<CreateItemDto>) {
    const foundedIndex = this.Items.findIndex((v) => v.id == id);
    if (foundedIndex === -1) {
      throw new NotFoundException('iten is not found');
    }
    this.Items[foundedIndex] = {
      ...this.Items[foundedIndex],
      ...item,
    };
  }

  deleteItem(id: number | string) {
    const foundedIndex = this.Items.findIndex((v) => v.id == id);
    if (foundedIndex === -1) throw new NotFoundException('iten is not found');
    this.Items.splice(foundedIndex, 1);
  }
}
