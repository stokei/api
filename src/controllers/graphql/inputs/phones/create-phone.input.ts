import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhoneInput {
  @Field()
  parent: string;

  @Field()
  countryCode: string;

  @Field()
  areaCode: string;

  @Field()
  number: string;
}
