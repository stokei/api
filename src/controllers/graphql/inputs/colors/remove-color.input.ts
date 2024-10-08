import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereColorInput {
  @Field()
  parent: string;

  @Field()
  color: string;
}

@InputType()
export class RemoveColorInput {
  @Field(() => RemoveWhereColorInput)
  where: RemoveWhereColorInput;
}
