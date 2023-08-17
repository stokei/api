import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { OrderStatus } from '@/controllers/graphql/enums/order-status.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Float)
  paidAmount: number;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Float)
  subtotalAmount: number;

  @Field(() => Float)
  feeAmount: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  paidAt?: string;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  paymentErrorAt?: string;

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
