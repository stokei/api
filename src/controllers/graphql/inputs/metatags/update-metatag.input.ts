import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataMetatagInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereMetatagInput {
  @Field()
  metatagId: string;
}

@InputType()
export class UpdateMetatagInput {
  @Field(() => UpdateDataMetatagInput)
  data: UpdateDataMetatagInput;

  @Field(() => UpdateWhereMetatagInput)
  where: UpdateWhereMetatagInput;
}
