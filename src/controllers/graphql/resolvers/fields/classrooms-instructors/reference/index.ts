import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ClassroomsInstructorsLoader } from '@/controllers/graphql/dataloaders/classrooms-instructors.loader';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';

@Resolver(() => ClassroomsInstructor)
export class ClassroomsInstructorReferenceResolver {
  constructor(
    private readonly classroomsInstructorsLoader: ClassroomsInstructorsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsInstructorsLoader.findByIds.load(reference.id);
  }
}
