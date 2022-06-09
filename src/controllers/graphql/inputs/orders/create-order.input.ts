import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
