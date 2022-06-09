import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereSitesDarkColorInput {
  @Field()
  sitesDarkColorId: string;
}

@InputType()
export class RemoveSitesDarkColorInput {
  @Field(() => RemoveWhereSitesDarkColorInput)
  where: RemoveWhereSitesDarkColorInput;
}
