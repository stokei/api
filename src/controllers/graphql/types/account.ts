import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AccountStatus } from '@/controllers/graphql/enums/account-status.enum';

import { App } from './app';
import { Image } from './image';

@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  fullname: string;

  @Field(() => App)
  app: App;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;

  @Field(() => Boolean, { nullable: true })
  isOwner?: boolean;

  @Field(() => Boolean, { nullable: true })
  isInstructor?: boolean;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => Boolean)
  isStokei: boolean;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
