import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
