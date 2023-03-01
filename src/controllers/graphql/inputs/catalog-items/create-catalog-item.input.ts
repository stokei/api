import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCatalogItemInput {
  @Field()
  catalog: string;

  @Field()
  product: string;
}
