import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Course } from './course';
import { Plan } from './plan';
import { Price } from './price';
import { Recurring } from './recurring';

@ObjectType()
export class SubscriptionContractItem {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => Plan, { nullable: true })
  plan?: Plan;

  @Field(() => Course, { nullable: true })
  course?: Course;

  @Field(() => Recurring, { nullable: true })
  recurring?: Recurring;

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
