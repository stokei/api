import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCatalogInput {
  @Field()
  parent: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;
}
