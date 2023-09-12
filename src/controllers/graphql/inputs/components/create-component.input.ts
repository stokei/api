import { Field, InputType } from '@nestjs/graphql';

import { ComponentType } from '@/controllers/graphql/enums/component-type.enum';
import { GraphQLJSONScalar } from '@/controllers/graphql/scalars/json.scalar';

@InputType()
export class CreateComponentInput {
  @Field(() => String)
  parent: string;

  @Field(() => ComponentType)
  type: ComponentType;

  @Field(() => GraphQLJSONScalar, { nullable: true })
  data?: JSON;
}
