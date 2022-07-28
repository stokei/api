import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAccessInput {
  @Field()
  access: string;
}

@InputType()
export class RemoveAccessInput {
  @Field(() => RemoveWhereAccessInput)
  where: RemoveWhereAccessInput;
}
