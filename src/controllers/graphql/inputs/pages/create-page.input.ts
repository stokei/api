import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePageInput {
  @Field(() => String)
  parent: string;

  @Field(() => String)
  title: string;
}
