import { Field, Float, InputType } from '@nestjs/graphql';

import { ComponentType } from '@/controllers/graphql/enums/component-type.enum';
import { GraphQLJSONScalar } from '@/controllers/graphql/scalars/json.scalar';

@InputType()
export class CreateOrUpdateComponentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  parent: string;

  @Field(() => ComponentType)
  type: ComponentType;

  @Field(() => Float)
  order?: number;

  @Field(() => GraphQLJSONScalar, { nullable: true })
  data?: JSON;
}
