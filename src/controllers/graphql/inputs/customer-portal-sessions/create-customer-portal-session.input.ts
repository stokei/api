import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerPortalSessionInput {
  @Field(() => String, { nullable: true })
  customer?: string;

  @Field(() => String)
  returnUrl: string;
}
