import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVersionInput {
  @Field(() => String)
  parent: string;

  @Field(() => String)
  name?: string;
}
