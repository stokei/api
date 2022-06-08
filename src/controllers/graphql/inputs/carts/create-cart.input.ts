import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
