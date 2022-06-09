import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereMetatagInput {
  @Field()
  metatagId: string;
}

@InputType()
export class RemoveMetatagInput {
  @Field(() => RemoveWhereMetatagInput)
  where: RemoveWhereMetatagInput;
}
