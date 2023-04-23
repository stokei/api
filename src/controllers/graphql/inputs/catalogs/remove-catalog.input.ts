import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCatalogInput {
  @Field()
  catalog: string;
}

@InputType()
export class RemoveCatalogInput {
  @Field(() => RemoveWhereCatalogInput)
  where: RemoveWhereCatalogInput;
}
