import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  slug: string;

  @Field()
  currency: string;

  @Field()
  language: string;
}
