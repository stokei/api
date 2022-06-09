import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomsPlansLoader } from '@/controllers/graphql/dataloaders/classrooms-plans.loader';
import { ClassroomsPlan } from '@/controllers/graphql/types/classrooms-plan';

@Resolver(() => ClassroomsPlan)
export class ClassroomsPlanReferenceResolver {
  constructor(private readonly classroomsPlansLoader: ClassroomsPlansLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsPlansLoader.findByIds.load(reference.id);
  }
}
