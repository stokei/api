import { Field, ObjectType } from '@nestjs/graphql';

import { Accesses } from './accesses';
import { Account } from './account';
import { Document } from './document';
import { PaymentMethods } from './payment-methods';
import { Phones } from './phones';

@ObjectType()
export class MeAccount extends Account {
  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => Accesses, { nullable: true })
  accesses: Accesses;

  @Field(() => Phones, { nullable: true })
  phones?: Phones;

  @Field(() => PaymentMethods, { nullable: true })
  paymentMethods?: PaymentMethods;

  @Field(() => Document, { nullable: true })
  document?: Document;
}
