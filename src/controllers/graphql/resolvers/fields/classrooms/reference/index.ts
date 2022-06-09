import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomsLoader } from '@/controllers/graphql/dataloaders/classrooms.loader';
import { Classroom } from '@/controllers/graphql/types/classroom';

@Resolver(() => Classroom)
export class ClassroomReferenceResolver {
  constructor(private readonly classroomsLoader: ClassroomsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsLoader.findByIds.load(reference.id);
  }
}
