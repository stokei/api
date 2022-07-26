import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  app: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
