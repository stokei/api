import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataSiteInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  favicon?: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => String, { nullable: true })
  homePage?: string;
}

@InputType()
export class UpdateWhereSiteInput {
  @Field()
  site: string;
}

@InputType()
export class UpdateSiteInput {
  @Field(() => UpdateDataSiteInput)
  data: UpdateDataSiteInput;

  @Field(() => UpdateWhereSiteInput)
  where: UpdateWhereSiteInput;
}
