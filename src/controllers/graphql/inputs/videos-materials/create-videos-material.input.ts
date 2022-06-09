import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideosMaterialInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
