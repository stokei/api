import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerPortalSessionInput {
  @Field(() => String, { nullable: true })
  app?: string;

  @Field(() => String)
  returnUrl: string;
}
