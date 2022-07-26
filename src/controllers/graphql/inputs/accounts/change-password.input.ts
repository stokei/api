import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  app: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  code: string;
}
