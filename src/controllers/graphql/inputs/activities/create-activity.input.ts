import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateActivityInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
