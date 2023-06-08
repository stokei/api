import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CompleteAccountConfigurationInput {
  @Field()
  account: string;

  @Field()
  password: string;
}
