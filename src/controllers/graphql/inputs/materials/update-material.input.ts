import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataMaterialInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field({ nullable: true })
  file?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Boolean, { nullable: true })
  free?: boolean;
}

@InputType()
export class UpdateWhereMaterialInput {
  @Field()
  material: string;
}

@InputType()
export class UpdateMaterialInput {
  @Field(() => UpdateDataMaterialInput)
  data: UpdateDataMaterialInput;

  @Field(() => UpdateWhereMaterialInput)
  where: UpdateWhereMaterialInput;
}
