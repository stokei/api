import { createUnionType, Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { InvoiceStatus } from '@/controllers/graphql/enums/invoice-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';
import { PaymentMethod } from './payment-method';
import { SubscriptionContract } from './subscription-contract';

export const InvoiceCustomerUnion = createUnionType({
  name: 'InvoiceCustomerUnion',
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
export class Invoice {
  @Field(() => ID)
  id: string;

  @Field(() => InvoiceCustomerUnion, { nullable: true })
  customer: typeof InvoiceCustomerUnion;

  @Field(() => SubscriptionContract)
  subscription: SubscriptionContract;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => InvoiceStatus)
  status: InvoiceStatus;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Float)
  subtotalAmount: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  url?: string;

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
