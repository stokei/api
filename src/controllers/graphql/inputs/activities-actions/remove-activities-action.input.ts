import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereActivitiesActionInput {
  @Field()
  activitiesActionId: string;
}

@InputType()
export class RemoveActivitiesActionInput {
  @Field(() => RemoveWhereActivitiesActionInput)
  where: RemoveWhereActivitiesActionInput;
}
