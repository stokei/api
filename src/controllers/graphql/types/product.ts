import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Course } from './course';
import { Features } from './features';
import { Image } from './image';
import { Plan } from './plan';
import { Price } from './price';
import { Prices } from './prices';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  parent?: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  checkoutVisible: boolean;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => Plan, { nullable: true })
  plan?: Plan;

  @Field(() => Course, { nullable: true })
  course?: Course;

  @Field(() => String)
  active: boolean;

  @Field(() => String, { nullable: true })
  activatedAt?: string;

  @Field(() => String, { nullable: true })
  deactivatedAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;

  @Field(() => Price, { nullable: true })
  defaultPrice?: Price;

  @Field(() => Prices, { nullable: true })
  prices?: Prices;

  @Field(() => Features, { nullable: true })
  features?: Features;

  @Field(() => App, { nullable: true })
  app?: App;
}
