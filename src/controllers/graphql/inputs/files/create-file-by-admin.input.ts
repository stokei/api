import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileByAdminInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  extension?: string;

  @Field(() => String, { nullable: true })
  mimetype?: string;

  @Field(() => Float, { nullable: true })
  size?: number;

  @Field(() => Float, { nullable: true })
  duration?: number;
}
