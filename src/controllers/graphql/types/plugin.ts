import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PluginType } from '@/controllers/graphql/enums/plugin-type.enum';

import { Account } from './account';

@ObjectType()
export class Plugin {
  @Field(() => ID)
  id: string;

  @Field(() => PluginType)
  type: PluginType;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
