import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  parent: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
