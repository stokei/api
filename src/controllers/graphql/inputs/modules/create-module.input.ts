import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateModuleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
