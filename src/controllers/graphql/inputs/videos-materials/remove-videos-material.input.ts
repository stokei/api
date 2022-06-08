import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideosMaterialInput {
  @Field()
  videosMaterialId: string;
}

@InputType()
export class RemoveVideosMaterialInput {
  @Field(() => RemoveWhereVideosMaterialInput)
  where: RemoveWhereVideosMaterialInput;
}
