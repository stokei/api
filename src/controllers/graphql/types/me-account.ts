import { Field, ObjectType } from '@nestjs/graphql';

import { Accesses } from './accesses';
import { Account } from './account';

@ObjectType()
//@Directive('@key(fields: "id")')
export class MeAccount extends Account {
  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => Accesses)
  accesses: Accesses;
}
