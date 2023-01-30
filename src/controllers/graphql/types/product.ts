import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { File } from './file';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  checkoutVisible: boolean;

  @Field(() => File, { nullable: true })
  avatar?: File;

  @Field(() => String)
  active: boolean;

  @Field(() => String, { nullable: true })
  activatedAt?: string;

  @Field(() => String, { nullable: true })
  deactivatedAt?: string;

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
