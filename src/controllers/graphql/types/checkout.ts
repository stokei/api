import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Checkout {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;
}
