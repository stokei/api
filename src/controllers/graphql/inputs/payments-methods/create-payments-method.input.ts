import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentsMethodInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
