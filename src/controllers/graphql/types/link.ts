import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => String)
  url: string;
}
