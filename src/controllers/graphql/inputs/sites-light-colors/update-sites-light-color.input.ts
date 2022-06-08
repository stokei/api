import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataSitesLightColorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereSitesLightColorInput {
  @Field()
  sitesLightColorId: string;
}

@InputType()
export class UpdateSitesLightColorInput {
  @Field(() => UpdateDataSitesLightColorInput)
  data: UpdateDataSitesLightColorInput;

  @Field(() => UpdateWhereSitesLightColorInput)
  where: UpdateWhereSitesLightColorInput;
}
