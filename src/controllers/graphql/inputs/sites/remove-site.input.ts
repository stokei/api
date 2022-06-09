import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereSiteInput {
  @Field()
  siteId: string;
}

@InputType()
export class RemoveSiteInput {
  @Field(() => RemoveWhereSiteInput)
  where: RemoveWhereSiteInput;
}
