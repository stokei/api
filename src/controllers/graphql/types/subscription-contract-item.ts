import { createUnionType, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

import { Account } from './account';
import { App } from './app';
import { Course } from './course';
import { Material } from './material';
import { Plan } from './plan';
import { Price } from './price';
import { Product } from './product';
import { Recurring } from './recurring';

export const SubscriptionContractItemProductUnion = createUnionType({
  name: 'SubscriptionContractItemProductUnion',
  types: () => [Plan, Course] as const,
  async resolveType(value) {
    const type = splitServiceId(value?.id)?.service;
    const types = {
      [ServerStokeiApiIdPrefix.COURSES]: Course.name,
      [ServerStokeiApiIdPrefix.MATERIALS]: Material.name,
      [ServerStokeiApiIdPrefix.PRODUCTS]: Product.name,
      [ServerStokeiApiIdPrefix.PLANS]: Plan.name
    };
    return types[type];
  }
});

@ObjectType()
export class SubscriptionContractItem {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => SubscriptionContractItemProductUnion, { nullable: true })
  product?: typeof SubscriptionContractItemProductUnion;

  @Field(() => Recurring, { nullable: true })
  recurring?: Recurring;

  @Field(() => Price, { nullable: true })
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
