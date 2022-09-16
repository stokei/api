import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { InvoiceStatus } from '@/controllers/graphql/enums/invoice-status.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';
import { Price } from './price';
import { Product } from './product';
import { SubscriptionContract } from './subscription-contract';

@ObjectType()
export class Invoice {
  @Field(() => ID)
  id: string;

  @Field(() => Account)
  customer: Account;

  @Field(() => SubscriptionContract)
  subscription: SubscriptionContract;

  @Field(() => Product)
  product: Product;

  @Field(() => Price)
  price: Price;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => InvoiceStatus)
  status: InvoiceStatus;

  @Field(() => Int)
  totalAmount: number;

  @Field(() => Int)
  subtotalAmount: number;

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
