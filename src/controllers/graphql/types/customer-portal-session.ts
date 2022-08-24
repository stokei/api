import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerPortalSession {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;
}
