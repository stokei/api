import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { SubscriptionContractStatus } from '@/controllers/graphql/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/controllers/graphql/enums/subscription-contract-type.enum';

import { Account } from './account';
import { App } from './app';
import { Classroom } from './classroom';
import { Currency } from './currency';
import { PaymentMethod } from './payment-method';
import { Plan } from './plan';

@ObjectType()
export class SubscriptionContract {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  totalAmount?: number;

  @Field(() => Int, { nullable: true })
  subtotalAmount?: number;

  @Field(() => Plan, { nullable: true })
  plan?: Plan;

  @Field(() => Classroom, { nullable: true })
  classroom?: Classroom;

  @Field(() => Currency, { nullable: true })
  currency?: Currency;

  @Field(() => SubscriptionContractStatus)
  status: SubscriptionContractStatus;

  @Field(() => SubscriptionContractType)
  type: SubscriptionContractType;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Boolean)
  automaticRenew: boolean;

  @Field(() => PaymentMethod, { nullable: true })
  defaultStripePaymentMethod?: PaymentMethod;

  @Field(() => String, { nullable: true })
  startAt?: string;

  @Field(() => String, { nullable: true })
  endAt?: string;

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

  @Field(() => App, { nullable: true })
  app?: App;
}
