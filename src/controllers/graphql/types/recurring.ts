import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { IntervalType } from '@/controllers/graphql/enums/interval-type.enum';
import { UsageType } from '@/controllers/graphql/enums/usage-type.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Recurring {
  @Field(() => ID)
  id: string;

  @Field(() => UsageType, { nullable: true })
  usageType: UsageType;

  @Field(() => Int)
  intervalCount: number;

  @Field(() => IntervalType, { nullable: true })
  interval: IntervalType;

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
