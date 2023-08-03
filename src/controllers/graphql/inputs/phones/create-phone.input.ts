import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhoneInput {
  @Field(() => String, { nullable: true })
  parent?: string;

  @Field()
  countryCode: string;

  @Field()
  areaCode: string;

  @Field()
  number: string;
}
