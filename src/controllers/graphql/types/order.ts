import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { OrderStatus } from '@/controllers/graphql/enums/order-status.enum';

import { Account } from './account';
import { App } from './app';
import { Cart } from './cart';
import { Currency } from './currency';
import { OrderItems } from './order-items';
import { Payments } from './payments';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => Cart)
  cart: Cart;

  @Field(() => OrderItems)
  items: OrderItems;

  @Field(() => Payments)
  payments: Payments;

  @Field(() => Account)
  customer: Account;

  @Field(() => Int)
  applicationFeePercentage: number;

  @Field(() => Int)
  applicationFeeAmount: number;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  discountAmount: number;

  @Field(() => Int)
  subtotalAmount: number;

  @Field(() => Int)
  totalAmount: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => OrderStatus, { nullable: true })
  oldStatus?: OrderStatus;

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
