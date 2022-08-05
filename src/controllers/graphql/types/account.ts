import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AccountRole } from '@/controllers/graphql/enums/account-role.enum';
import { AccountStatus } from '@/controllers/graphql/enums/account-status.enum';

import { Image } from './image';
import { Language } from './language';
import { Phones } from './phones';

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

  @Field(() => String)
  app: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => Language, { nullable: true })
  language?: Language;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => Phones, { nullable: true })
  phones?: Phones;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => [AccountRole])
  roles: AccountRole[];
}
