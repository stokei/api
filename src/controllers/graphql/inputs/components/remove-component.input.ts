import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereComponentInput {
  @Field()
  component: string;
}

@InputType()
export class RemoveComponentInput {
  @Field(() => RemoveWhereComponentInput)
  where: RemoveWhereComponentInput;
}
