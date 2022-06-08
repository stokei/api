import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataActivitiesActionInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereActivitiesActionInput {
  @Field()
  activitiesActionId: string;
}

@InputType()
export class UpdateActivitiesActionInput {
  @Field(() => UpdateDataActivitiesActionInput)
  data: UpdateDataActivitiesActionInput;

  @Field(() => UpdateWhereActivitiesActionInput)
  where: UpdateWhereActivitiesActionInput;
}
