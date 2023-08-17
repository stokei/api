import { Field, ObjectType } from '@nestjs/graphql';

import { Order } from './order';

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

  @Field(() => CheckoutPix, { nullable: true })
  pix?: CheckoutPix;

  @Field(() => Order)
  order: Order;
}
