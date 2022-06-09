import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRatingInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
