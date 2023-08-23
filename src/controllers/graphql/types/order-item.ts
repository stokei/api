import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Price } from './price';
import { Product } from './product';
import { Recurring } from './recurring';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => Product)
  product: Product;

  @Field(() => Float)
  quantity: number;

  @Field(() => Price, { nullable: true })
  price?: Price;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Float)
  subtotalAmount: number;

  @Field(() => Recurring, { nullable: true })
  recurring?: Recurring;

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
