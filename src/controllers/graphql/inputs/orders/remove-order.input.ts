import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrderInput {
  @Field()
  order: string;
}

@InputType()
export class RemoveOrderInput {
  @Field(() => RemoveWhereOrderInput)
  where: RemoveWhereOrderInput;
}
