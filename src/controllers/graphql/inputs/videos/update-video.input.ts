import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideoInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  poster?: string;

  @Field(() => Boolean, { nullable: true })
  private?: boolean;
}

@InputType()
export class UpdateWhereVideoInput {
  @Field()
  video: string;
}

@InputType()
export class UpdateVideoInput {
  @Field(() => UpdateDataVideoInput)
  data: UpdateDataVideoInput;

  @Field(() => UpdateWhereVideoInput)
  where: UpdateWhereVideoInput;
}
