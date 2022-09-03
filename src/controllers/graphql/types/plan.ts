import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Account } from './account';
import { Price } from './price';

@ObjectType()
export class Plan {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  hasCustomDomain: boolean;

  @Field(() => Boolean)
  hasCustomSite: boolean;

  @Field(() => Int)
  quantityCourses: number;

  @Field(() => Int)
  quantityInstructorPerCourses: number;

  @Field(() => Int)
  quantityClassroomsPerCourses: number;

  @Field(() => Int)
  quantityModulesPerClassrooms: number;

  @Field(() => Int)
  quantityVideosPerModules: number;

  @Field(() => Int)
  applicationFeePercentage: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Price, { nullable: true })
  price?: Price;

  @Field(() => String, { nullable: true })
  canceledAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => Account, { nullable: true })
  updatedBy?: Account;

  @Field(() => Account, { nullable: true })
  createdBy?: Account;
}
