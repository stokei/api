import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class VideoView {
  @Field(() => ID)
  id: string;

  @Field(() => Account, { nullable: true })
  viewer?: Account;

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
