import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataActivityInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereActivityInput {
  @Field()
  activityId: string;
}

@InputType()
export class UpdateActivityInput {
  @Field(() => UpdateDataActivityInput)
  data: UpdateDataActivityInput;

  @Field(() => UpdateWhereActivityInput)
  where: UpdateWhereActivityInput;
}
