import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ComponentType } from '@/controllers/graphql/enums/component-type.enum';

import { GraphQLJSONScalar } from '../scalars/json.scalar';
import { Account } from './account';
import { App } from './app';

@ObjectType()
export class Component {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  parent: string;

  @Field(() => GraphQLJSONScalar)
  data?: JSON;

  @Field(() => ComponentType)
  type: ComponentType;

  @Field(() => ComponentType)
  acceptTypes?: ComponentType;

  @Field(() => [Component], { nullable: true })
  components?: Component;

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

@ObjectType()
export class Components extends Paginated(Component) {}
