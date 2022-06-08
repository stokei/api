import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
