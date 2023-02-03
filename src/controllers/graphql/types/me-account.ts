import { Field, ObjectType } from '@nestjs/graphql';

import { Accesses } from './accesses';
import { Account } from './account';
import { PaymentMethods } from './payment-methods';
import { Phones } from './phones';

@ObjectType()
export class MeAccount extends Account {
  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;

  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => Accesses, { nullable: true })
  accesses: Accesses;

  @Field(() => Phones, { nullable: true })
  phones?: Phones;

  @Field(() => PaymentMethods, { nullable: true })
  paymentMethods?: PaymentMethods;
}
