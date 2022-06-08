import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateModulesVideoInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
