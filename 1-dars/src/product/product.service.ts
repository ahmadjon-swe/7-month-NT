import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private count: number = 2;
  // private products: Required<UpdateProductDto>[] = [
  private products: ({ id: number } & CreateProductDto)[] = [
    {
      id: 1,
      title: 'olma',
      price: 19000,
      desc: '5 Barmoq navli qizil olma',
    },
  ];

  create(dto: CreateProductDto) {
    this.count++;
    this.products.push({
      id: this.count,
      ...dto,
    });
    return 'created';
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const foundedProduct = this.products.find((v) => v.id == id);

    if (!foundedProduct) {
      throw new NotFoundException();
    }
    return foundedProduct;
  }

  update(id: number, dto: UpdateProductDto) {
    const foundedIndex = this.products.findIndex((v) => v.id == id);

    if (foundedIndex === -1) {
      throw new NotFoundException('product is not found');
    }

    this.products[foundedIndex] = {
      ...this.products[foundedIndex],
      ...dto,
    };

    return 'updated product';
  }

  remove(id: number) {
    const foundedIndex = this.products.findIndex((v) => v.id == id);

    if (foundedIndex === -1) {
      throw new NotFoundException('product is not found');
    }
    this.products.splice(foundedIndex, 1);
    return 'deleted product';
  }
}
