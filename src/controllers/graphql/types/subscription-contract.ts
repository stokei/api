import { Field, ID, ObjectType } from '@nestjs/graphql';

import { SubscriptionContractStatus } from '@/controllers/graphql/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/controllers/graphql/enums/subscription-contract-type.enum';

import { Account } from './account';
import { App } from './app';
import { Invoice } from './invoice';
import { PaymentMethod } from './payment-method';

@ObjectType()
export class SubscriptionContract {
  @Field(() => ID)
  id: string;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod;

  @Field(() => SubscriptionContractStatus)
  status: SubscriptionContractStatus;

  @Field(() => SubscriptionContractType)
  type: SubscriptionContractType;

  @Field(() => Invoice, { nullable: true })
  lastInvoice: Invoice;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Boolean)
  automaticRenew: boolean;

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
