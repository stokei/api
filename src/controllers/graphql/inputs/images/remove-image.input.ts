import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereImageInput {
  @Field()
  imageId: string;
}

@InputType()
export class RemoveImageInput {
  @Field(() => RemoveWhereImageInput)
  where: RemoveWhereImageInput;
}
