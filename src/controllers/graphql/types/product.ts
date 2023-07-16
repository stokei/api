import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

import { Account } from './account';
import { App } from './app';
import { Course } from './course';
import { Features } from './features';
import { Image } from './image';
import { Plan } from './plan';
import { Price } from './price';
import { Prices } from './prices';

export const ProductParentUnion = createUnionType({
  name: 'ProductParentUnion',
  types: () => [Plan, Course] as const,
  async resolveType(value) {
    const type = splitServiceId(value?.id)?.service;
    const types = {
      [ServerStokeiApiIdPrefix.APPS]: App.name,
      [ServerStokeiApiIdPrefix.COURSES]: Course.name,
      [ServerStokeiApiIdPrefix.PLANS]: Plan.name
    };
    return types[type];
  }
});

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => ProductParentUnion, { nullable: true })
  parent?: typeof ProductParentUnion;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => Boolean)
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
