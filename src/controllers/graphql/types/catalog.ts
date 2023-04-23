import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { CatalogItems } from './catalog-items';

@ObjectType()
export class Catalog {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  subtitle?: string;

  @Field(() => CatalogItems, { nullable: true })
  items?: CatalogItems;

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
