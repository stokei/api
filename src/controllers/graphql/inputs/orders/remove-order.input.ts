import { InputType, Field } from '@nestjs/graphql';

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
