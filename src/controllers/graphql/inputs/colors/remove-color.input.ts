import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereColorInput {
  @Field()
  colorId: string;
}

@InputType()
export class RemoveColorInput {
  @Field(() => RemoveWhereColorInput)
  where: RemoveWhereColorInput;
}
