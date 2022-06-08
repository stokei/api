import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataSitesDarkColorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereSitesDarkColorInput {
  @Field()
  sitesDarkColorId: string;
}

@InputType()
export class UpdateSitesDarkColorInput {
  @Field(() => UpdateDataSitesDarkColorInput)
  data: UpdateDataSitesDarkColorInput;

  @Field(() => UpdateWhereSitesDarkColorInput)
  where: UpdateWhereSitesDarkColorInput;
}
