import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PhoneStatus } from '@/controllers/graphql/enums/phone-status.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Phone {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  fullnumber: string;

  @Field(() => String)
  countryCode: string;

  @Field(() => String)
  areaCode: string;

  @Field(() => String)
  number: string;

  @Field(() => String)
  validationCode: string;

  @Field(() => PhoneStatus)
  status: PhoneStatus;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  activatedAt?: string;

  @Field(() => String, { nullable: true })
  validatedAt?: string;

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
