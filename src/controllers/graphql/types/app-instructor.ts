import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class AppInstructor {
  @Field(() => ID)
  id: string;

  @Field(() => App)
  app: App;

  @Field(() => Account)
  instructor: Account;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
