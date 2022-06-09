import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
