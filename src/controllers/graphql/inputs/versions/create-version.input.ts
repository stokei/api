import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVersionInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
