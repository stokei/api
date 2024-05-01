import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereSiteInput {
  @Field()
  site: string;
}

@InputType()
export class RemoveSiteInput {
  @Field(() => RemoveWhereSiteInput)
  where: RemoveWhereSiteInput;
}
