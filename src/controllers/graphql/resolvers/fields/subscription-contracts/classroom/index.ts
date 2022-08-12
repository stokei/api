import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { ClassroomsLoader } from '@/controllers/graphql/dataloaders/classrooms.loader';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractClassroomResolver {
  constructor(private readonly classroomsLoader: ClassroomsLoader) {}

  @ResolveField(() => Classroom, { nullable: true })
  classroom(@Parent() subscriptionContract: SubscriptionContractModel) {
    const service = splitServiceId(subscriptionContract?.product)?.service;
    const isClassroom = service === ServerStokeiApiIdPrefix.CLASSROOMS;
    return (
      isClassroom &&
      subscriptionContract.product &&
      this.classroomsLoader.findByIds.load(subscriptionContract.product)
    );
  }
}
