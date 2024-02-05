import { createUnionType, Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { OrderStatus } from '@/controllers/graphql/enums/order-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

import { Account } from './account';
import { App } from './app';
import { Coupon } from './coupon';
import { Currency } from './currency';
import { OrderItems } from './order-items';
import { Payments } from './payments';

export const OrderParentUnion = createUnionType({
  name: 'OrderParentUnion',
  types: () => [Account, App] as const,
  async resolveType(value) {
    const type = splitServiceId(value?.id)?.service;
    const types = {
      [ServerStokeiApiIdPrefix.ACCOUNTS]: Account.name,
      [ServerStokeiApiIdPrefix.APPS]: App.name
    };
    return types[type];
  }
});

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => OrderParentUnion)
  parent: typeof OrderParentUnion;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => OrderItems, { nullable: true })
  items?: OrderItems;

  @Field(() => Payments, { nullable: true })
  payments?: Payments;

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

  @Field(() => Coupon, { nullable: true })
  coupon?: Coupon;
}
