import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { App } from './app';
import { Domain } from './domain';
import { Image } from './image';
import { Page } from './page';
import { Pages } from './pages';

@ObjectType()
export class Site {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => Image, { nullable: true })
  favicon?: Image;

  @Field(() => Image, { nullable: true })
  logo?: Image;

  @Field(() => Page, { nullable: true })
  homePage?: Page;

  @Field(() => Page, { nullable: true })
  loginPage?: Page;

  @Field(() => Page, { nullable: true })
  signUpPage?: Page;

  @Field(() => Domain, { nullable: true })
  stokeiDomain?: Domain;

  @Field(() => Domain, { nullable: true })
  defaultDomain?: Domain;

  @Field(() => Pages, { nullable: true })
  pages?: Pages;

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
