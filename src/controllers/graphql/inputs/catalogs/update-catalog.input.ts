import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCatalogInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  subtitle?: string;
}

@InputType()
export class UpdateWhereCatalogInput {
  @Field()
  catalog: string;
}

@InputType()
export class UpdateCatalogInput {
  @Field(() => UpdateDataCatalogInput)
  data: UpdateDataCatalogInput;

  @Field(() => UpdateWhereCatalogInput)
  where: UpdateWhereCatalogInput;
}
