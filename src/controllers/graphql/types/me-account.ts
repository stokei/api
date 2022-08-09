import { Field, ObjectType } from '@nestjs/graphql';

import { Accesses } from './accesses';
import { Account } from './account';
import { Phones } from './phones';

@ObjectType()
export class MeAccount extends Account {
  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => Accesses, { nullable: true })
  accesses: Accesses;

  @Field(() => Phones, { nullable: true })
  phones?: Phones;
}
