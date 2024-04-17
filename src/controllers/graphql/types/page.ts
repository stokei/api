import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PageType } from '@/controllers/graphql/enums/page-type.enum';

import { Account } from './account';
import { App } from './app';
import { Version } from './version';

@ObjectType()
export class Page {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String)
  title: string;

  @Field(() => PageType)
  type: PageType;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => Version, { nullable: true })
  version?: Version;

  @Field(() => Version, { nullable: true })
  drafVersion?: Version;

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
