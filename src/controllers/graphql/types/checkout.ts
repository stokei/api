import { Field, ObjectType } from '@nestjs/graphql';

import { Payment } from './payment';

@ObjectType()
export class CheckoutBoleto {
  @Field(() => String)
  line: string;

  @Field(() => String)
  pdf: string;

  @Field(() => String)
  barcode: string;
}

@ObjectType()
export class CheckoutCard {
  @Field(() => String)
  brand: string;

  @Field(() => String)
  lastFourNumber: string;

  @Field(() => String)
  expiryMonth: string;

  @Field(() => String)
  expiryYear: string;
}

@ObjectType()
export class CheckoutPix {
  @Field(() => String)
  qrCodeURL: string;

  @Field(() => String)
  copyAndPaste: string;
}

@ObjectType()
export class Checkout {
  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => CheckoutBoleto, { nullable: true })
  boleto?: CheckoutBoleto;

  @Field(() => CheckoutCard, { nullable: true })
  card?: CheckoutCard;

  @Field(() => CheckoutPix, { nullable: true })
  pix?: CheckoutPix;

  @Field(() => Payment)
  payment: Payment;
}
