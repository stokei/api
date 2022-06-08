import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataPlanInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWherePlanInput {
  @Field()
  planId: string;
}

@InputType()
export class UpdatePlanInput {
  @Field(() => UpdateDataPlanInput)
  data: UpdateDataPlanInput;

  @Field(() => UpdateWherePlanInput)
  where: UpdateWherePlanInput;
}
