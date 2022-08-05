import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { PaymentStatus } from '@/controllers/graphql/enums/payment-status.enum';

import { Account } from './account';
import { App } from './app';
import { Order } from './order';
import { PaymentMethod } from './payment-method';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field(() => Account)
  customer: Account;

  @Field(() => Order)
  order: Order;

  @Field(() => Int)
  amount: number;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field(() => PaymentStatus)
  status: PaymentStatus;

  @Field(() => PaymentStatus, { nullable: true })
  oldStatus?: PaymentStatus;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  paidAt?: string;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  paymentErrorAt?: string;

  @Field(() => String, { nullable: true })
  totalRefundedAt?: string;

  @Field(() => String, { nullable: true })
  parcialRefundedAt?: string;

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
