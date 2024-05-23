import { Field, Float, ObjectType } from '@nestjs/graphql';

import { Product } from './product';

@ObjectType()
export class ProductBestSeller {
  @Field(() => Float)
  quantity: number;

  @Field(() => Product)
  product: Product;
}
