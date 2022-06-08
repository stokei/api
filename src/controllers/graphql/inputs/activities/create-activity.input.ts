import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateActivityInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
