import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideoInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVideoInput {
  @Field()
  videoId: string;
}

@InputType()
export class UpdateVideoInput {
  @Field(() => UpdateDataVideoInput)
  data: UpdateDataVideoInput;

  @Field(() => UpdateWhereVideoInput)
  where: UpdateWhereVideoInput;
}
