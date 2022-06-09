import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartsItemInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
