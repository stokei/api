import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PaymentMethodType } from '@/controllers/graphql/enums/payment-method-type.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => String, { nullable: true })
  stripePaymentMethod?: string;

  @Field(() => String, { nullable: true })
  lastFourCardNumber?: string;

  @Field(() => String, { nullable: true })
  cardBrand?: string;

  @Field(() => String, { nullable: true })
  cardExpiryMonth?: string;

  @Field(() => String, { nullable: true })
  cardExpiryYear?: string;

  @Field(() => PaymentMethodType, { nullable: true })
  type?: PaymentMethodType;

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
