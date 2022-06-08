import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
