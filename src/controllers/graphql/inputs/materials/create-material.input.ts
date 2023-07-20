import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMaterialInput {
  @Field()
  parent: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  file: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Boolean, { nullable: true })
  free?: boolean;
}
