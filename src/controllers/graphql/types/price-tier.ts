import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class PriceTier {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int, { nullable: true })
  upTo?: number;

  @Field(() => Boolean)
  infinite: boolean;

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
