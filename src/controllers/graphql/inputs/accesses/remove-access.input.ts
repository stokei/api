import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAccessInput {
  @Field()
  accessId: string;
}

@InputType()
export class RemoveAccessInput {
  @Field(() => RemoveWhereAccessInput)
  where: RemoveWhereAccessInput;
}
