import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWherePlanInput {
  @Field()
  planId: string;
}

@InputType()
export class RemovePlanInput {
  @Field(() => RemoveWherePlanInput)
  where: RemoveWherePlanInput;
}
