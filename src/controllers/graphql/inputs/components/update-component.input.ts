import { Field, InputType } from '@nestjs/graphql';

import { GraphQLJSONScalar } from '@/controllers/graphql/scalars/json.scalar';

@InputType()
export class UpdateDataComponentInput {
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
