import { Field, ID, ObjectType } from '@nestjs/graphql';

import { DomainStatus } from '@/controllers/graphql/enums/domain-status.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Domain {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  url: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => DomainStatus)
  status: DomainStatus;

  @Field(() => String, { nullable: true })
  activatedAt?: string;

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
