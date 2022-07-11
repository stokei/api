import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomInstructorsLoader } from '@/controllers/graphql/dataloaders/classroom-instructors.loader';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorReferenceResolver {
  constructor(
    private readonly classroomInstructorsLoader: ClassroomInstructorsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomInstructorsLoader.findByIds.load(reference.id);
  }
}
