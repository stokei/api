import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Components } from './component';

@ObjectType()
export class Version {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String)
  name: string;

  @Field(() => Components, { nullable: true })
  components?: Components;

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
