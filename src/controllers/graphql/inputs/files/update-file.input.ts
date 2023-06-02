import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataFileInput {
  @Field(() => String, { nullable: true })
  extension?: string;

  @Field(() => String, { nullable: true })
  mimetype?: string;

  @Field(() => Float, { nullable: true })
  size?: number;

  @Field(() => Float, { nullable: true })
  duration?: number;
}

@InputType()
export class UpdateWhereFileInput {
  @Field()
  file: string;
}

@InputType()
export class UpdateFileInput {
  @Field(() => UpdateDataFileInput)
  data: UpdateDataFileInput;

  @Field(() => UpdateWhereFileInput)
  where: UpdateWhereFileInput;
}
