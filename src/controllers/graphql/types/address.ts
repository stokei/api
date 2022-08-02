import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Address {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => String)
  street: string;

  @Field(() => String, { nullable: true })
  complement?: string;

  @Field(() => String)
  number: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  postalCode: string;

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
