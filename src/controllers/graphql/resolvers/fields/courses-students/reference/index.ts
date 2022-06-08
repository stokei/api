import { Resolver, ResolveReference } from '@nestjs/graphql';
import { CoursesStudentsLoader } from '@/controllers/graphql/dataloaders/courses-students.loader';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';

@Resolver(() => CoursesStudent)
export class CoursesStudentReferenceResolver {
  constructor(private readonly coursesStudentsLoader: CoursesStudentsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.coursesStudentsLoader.findByIds.load(reference.id);
  }
}
