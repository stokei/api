import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhoneCode {
  @Field(() => String)
  country: string;

  @Field(() => String)
  code: string;
}
