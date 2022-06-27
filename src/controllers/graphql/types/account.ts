import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AccountRole } from '@/controllers/graphql/enums/account-role.enum';
import { AccountStatus } from '@/controllers/graphql/enums/account-status.enum';

@ObjectType()
//@Directive('@key(fields: "id")')
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
  parent: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  language?: string;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => [AccountRole])
  roles: AccountRole[];
}
