import { Field, Float, InputType } from '@nestjs/graphql';

import { GraphQLJSONScalar } from '@/controllers/graphql/scalars/json.scalar';

@InputType()
export class UpdateDataComponentInput {
  @Field(() => Float, { nullable: true })
  order?: number;

  @Field(() => String, { nullable: true })
  parent?: string;

  @Field(() => GraphQLJSONScalar, { nullable: true })
  data?: JSON;
}

@InputType()
export class UpdateWhereComponentInput {
  @Field()
  component: string;
}

@InputType()
export class UpdateComponentInput {
  @Field(() => UpdateDataComponentInput)
  data: UpdateDataComponentInput;

  @Field(() => UpdateWhereComponentInput)
  where: UpdateWhereComponentInput;
}
