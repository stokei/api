import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereSitesLightColorInput {
  @Field()
  sitesLightColorId: string;
}

@InputType()
export class RemoveSitesLightColorInput {
  @Field(() => RemoveWhereSitesLightColorInput)
  where: RemoveWhereSitesLightColorInput;
}
