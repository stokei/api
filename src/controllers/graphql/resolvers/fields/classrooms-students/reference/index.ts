import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ClassroomsStudentsLoader } from '@/controllers/graphql/dataloaders/classrooms-students.loader';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';

@Resolver(() => ClassroomsStudent)
export class ClassroomsStudentReferenceResolver {
  constructor(
    private readonly classroomsStudentsLoader: ClassroomsStudentsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsStudentsLoader.findByIds.load(reference.id);
  }
}
