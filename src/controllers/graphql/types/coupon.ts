import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Coupon {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => Float, { nullable: true })
  amountOff?: number;

  @Field(() => Float, { nullable: true })
  percentOff?: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Account, { nullable: true })
  recipient?: Account;

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
