import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UsageRecordAction } from '@/controllers/graphql/enums/usage-record-action.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class UsageRecord {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => UsageRecordAction)
  action: UsageRecordAction;

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
