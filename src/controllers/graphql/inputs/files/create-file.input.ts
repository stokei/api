import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
