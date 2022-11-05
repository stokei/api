import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class AppAdmin {
  @Field(() => ID)
  id: string;

  @Field(() => App)
  app: App;

  @Field(() => Account)
  admin: Account;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
