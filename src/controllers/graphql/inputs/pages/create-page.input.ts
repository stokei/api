import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePageInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
