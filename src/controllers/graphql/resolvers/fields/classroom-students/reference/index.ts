import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomStudentsLoader } from '@/controllers/graphql/dataloaders/classroom-students.loader';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentReferenceResolver {
  constructor(
    private readonly classroomStudentsLoader: ClassroomStudentsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomStudentsLoader.findByIds.load(reference.id);
  }
}
