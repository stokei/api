import { Field, InputType } from '@nestjs/graphql';

import { ProductType } from '@/controllers/graphql/enums/product-type.enum';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  parent: string;

  @Field(() => String, { nullable: true })
  externalReference?: string;

  @Field(() => String)
  name: string;

  @Field(() => ProductType)
  type: ProductType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  catalogs?: string[];

  @Field(() => [String], { nullable: true })
  comboProducts?: string[];
}
