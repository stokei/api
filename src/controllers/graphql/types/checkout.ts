import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Checkout {
  @Field(() => String)
  url: string;
}
