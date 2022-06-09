import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereOrderInput {
  @Field()
  orderId: string;
}

@InputType()
export class RemoveOrderInput {
  @Field(() => RemoveWhereOrderInput)
  where: RemoveWhereOrderInput;
}
