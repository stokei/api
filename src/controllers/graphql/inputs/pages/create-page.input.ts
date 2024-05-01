import { Field, InputType } from '@nestjs/graphql';

import { PageType } from '@/controllers/graphql/enums/page-type.enum';

@InputType()
export class CreatePageInput {
  @Field(() => String)
  parent: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => PageType, { nullable: true })
  type?: PageType;
}
