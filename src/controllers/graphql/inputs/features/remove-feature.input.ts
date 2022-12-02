import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereFeatureInput {
  @Field()
  feature: string;
}

@InputType()
export class RemoveFeatureInput {
  @Field(() => RemoveWhereFeatureInput)
  where: RemoveWhereFeatureInput;
}
