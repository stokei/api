import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PlanType } from '@/controllers/graphql/enums/plan-type.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Plan {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => PlanType)
  type: PlanType;

  @Field(() => Boolean)
  active: boolean;

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
