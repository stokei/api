import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AppStatus } from '@/controllers/graphql/enums/app-status.enum';

import { Account } from './account';
import { Colors } from './colors';
import { Currency } from './currency';
import { Hero } from './hero';
import { Image } from './image';
import { Phones } from './phones';
import { SubscriptionContract } from './subscription-contract';

@ObjectType()
export class App {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => AppStatus)
  status: AppStatus;

  @Field(() => Image, { nullable: true })
  avatar?: Image;

  @Field(() => SubscriptionContract, { nullable: true })
  currentSubscriptionContract?: SubscriptionContract;

  @Field(() => Phones, { nullable: true })
  phones?: Phones;

  @Field(() => Hero, { nullable: true })
  hero?: Hero;

  @Field(() => Colors, { nullable: true })
  colors?: Colors;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => Image, { nullable: true })
  icon?: Image;

  @Field(() => Image, { nullable: true })
  logo?: Image;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Boolean)
  isStokei: boolean;

  @Field(() => String, { nullable: true })
  blockedAt?: string;

  @Field(() => String, { nullable: true })
  activatedAt?: string;

  @Field(() => String, { nullable: true })
  deactivatedAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
