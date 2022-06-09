import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccessInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
