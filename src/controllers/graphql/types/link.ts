import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  url: string;
}
