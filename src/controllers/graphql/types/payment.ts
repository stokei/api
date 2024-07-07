import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { PaymentGatewayType } from '@/controllers/graphql/enums/payment-gateway-type.enum';
import { PaymentStatus } from '@/controllers/graphql/enums/payment-status.enum';

import { Account } from './account';
import { App } from './app';
import { Currency } from './currency';
import { PaymentMethod } from './payment-method';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => Account, { nullable: true })
  payer: Account;

  @Field(() => Currency)
  currency: Currency;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod;

  @Field(() => PaymentStatus)
  status: PaymentStatus;

  @Field(() => PaymentGatewayType)
  paymentGatewayType: PaymentGatewayType;

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
