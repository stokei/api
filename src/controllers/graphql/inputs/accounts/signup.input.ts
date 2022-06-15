import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  parent: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}