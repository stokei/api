import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhoneInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
