import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataSiteInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereSiteInput {
  @Field()
  siteId: string;
}

@InputType()
export class UpdateSiteInput {
  @Field(() => UpdateDataSiteInput)
  data: UpdateDataSiteInput;

  @Field(() => UpdateWhereSiteInput)
  where: UpdateWhereSiteInput;
}
