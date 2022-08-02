import { Field, ObjectType } from '@nestjs/graphql';

import { Accesses } from './accesses';
import { Account } from './account';
import { App } from './app';

@ObjectType()
export class MeAccount extends Account {
  @Field(() => String, { nullable: true })
  dateBirthday?: string;

  @Field(() => Accesses)
  accesses: Accesses;
}
