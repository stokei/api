import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccessInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
