import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PaymentMethodProvider } from '@/controllers/graphql/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/controllers/graphql/enums/payment-method-type.enum';

import { Account } from './account';
import { App } from './app';

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field(() => Account)
  parent: Account;

  @Field(() => PaymentMethodType)
  type: PaymentMethodType;

  @Field(() => PaymentMethodProvider)
  provider: PaymentMethodProvider;

  @Field(() => String)
  externalPaymentMethod: string;

  @Field(() => String, { nullable: true })
  lastFourCardNumber?: string;

  @Field(() => String, { nullable: true })
  cardBrand?: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  activatedAt?: string;

  @Field(() => String, { nullable: true })
  deactivatedAt?: string;

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
