import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCatalogItemInput {
  @Field()
  catalog: string;

  @Field()
  product: string;
}

@InputType()
export class RemoveCatalogItemInput {
  @Field(() => RemoveWhereCatalogItemInput)
  where: RemoveWhereCatalogItemInput;
}
