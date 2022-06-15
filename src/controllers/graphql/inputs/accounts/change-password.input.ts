import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  parent: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  code: string;
}
