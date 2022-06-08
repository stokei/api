import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhoneInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
