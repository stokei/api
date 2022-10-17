import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { Course } from '@/controllers/graphql/types/course';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractCourseResolver {
  constructor(private readonly coursesLoader: CoursesLoader) {}

  @ResolveField(() => Course, { nullable: true })
  course(@Parent() subscriptionContract: SubscriptionContractModel) {
    const service = splitServiceId(subscriptionContract?.product)?.service;
    const isCourse = service === ServerStokeiApiIdPrefix.COURSES;
    return (
      isCourse &&
      subscriptionContract.product &&
      this.coursesLoader.findByIds.load(subscriptionContract.product)
    );
  }
}
