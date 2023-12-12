import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { CatalogItem } from './catalog-item';

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

  @Field(() => [CatalogItem], { nullable: true })
  items?: CatalogItem[];

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
