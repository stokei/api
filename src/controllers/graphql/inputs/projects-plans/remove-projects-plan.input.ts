import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProjectsPlanInput {
  @Field()
  projectsPlanId: string;
}

@InputType()
export class RemoveProjectsPlanInput {
  @Field(() => RemoveWhereProjectsPlanInput)
  where: RemoveWhereProjectsPlanInput;
}
