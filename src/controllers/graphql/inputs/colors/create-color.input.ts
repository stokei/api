import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateColorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
