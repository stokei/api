import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppInput {
  @Field()
  parent: string;

  @Field()
  name: string;

  @Field()
  currency: string;
}
