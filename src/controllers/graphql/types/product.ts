import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { ProductType } from '@/controllers/graphql/enums/product-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

import { Account } from './account';
import { App } from './app';
import { Course } from './course';
import { Features } from './features';
import { Image } from './image';
import { Material } from './material';
import { Plan } from './plan';
import { Price } from './price';
import { Prices } from './prices';

export const ProductExternalReferenceUnion = createUnionType({
  name: 'ProductExternalReferenceUnion',
  types: () => [Plan, Course, Material, App, Product] as const,
  async resolveType(value) {
    const type = splitServiceId(value?.id)?.service;
    const types = {
      [ServerStokeiApiIdPrefix.APPS]: App.name,
      [ServerStokeiApiIdPrefix.PRODUCTS]: Product.name,
      [ServerStokeiApiIdPrefix.COURSES]: Course.name,
      [ServerStokeiApiIdPrefix.MATERIALS]: Material.name,
      [ServerStokeiApiIdPrefix.PLANS]: Plan.name
    };
    return types[type];
  }
});

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => ProductExternalReferenceUnion, { nullable: true })
  externalReference?: typeof ProductExternalReferenceUnion;

  @Field(() => String, { nullable: true })
  parent?: string;

  @Field(() => String)
  name: string;

  @Field(() => ProductType)
  type: ProductType;

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

  @Field(() => [Product], { nullable: true })
  combo?: Product[];

  @Field(() => App, { nullable: true })
  app?: App;
}
