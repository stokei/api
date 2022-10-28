import { Field, InputType } from '@nestjs/graphql';

import { PlanType } from '@/controllers/graphql/enums/plan-type.enum';
@InputType()
export class CreatePlanInput {
  @Field(() => String)
  name: string;

  @Field(() => PlanType)
  type: PlanType;
}
