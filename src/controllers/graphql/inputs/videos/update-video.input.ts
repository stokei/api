import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideoInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field({ nullable: true })
  file?: string;

  @Field(() => String, { nullable: true })
  poster?: string;

  @Field(() => Float, { nullable: true })
  duration?: number;

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
