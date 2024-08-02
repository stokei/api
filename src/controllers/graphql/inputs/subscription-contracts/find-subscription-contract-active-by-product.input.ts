import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindSubscriptionContractActiveByProductInput {
  @Field(() => String)
  product: string;
}
