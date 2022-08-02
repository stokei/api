import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Price } from './price';
import { Product } from './product';

@ObjectType()
export class CartItem {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  product: Product;

  @Field(() => Price)
  price: Price;

  @Field(() => Int)
  quantity: number;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;

  @Field(() => App, { nullable: true })
  app?: App;
}
