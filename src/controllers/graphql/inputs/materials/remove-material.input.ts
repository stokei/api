import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereMaterialInput {
  @Field()
  material: string;
}

@InputType()
export class RemoveMaterialInput {
  @Field(() => RemoveWhereMaterialInput)
  where: RemoveWhereMaterialInput;
}
