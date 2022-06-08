import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereActivityInput {
  @Field()
  activityId: string;
}

@InputType()
export class RemoveActivityInput {
  @Field(() => RemoveWhereActivityInput)
  where: RemoveWhereActivityInput;
}
