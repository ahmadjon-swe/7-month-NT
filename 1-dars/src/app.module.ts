import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ItemModule, ProductModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
