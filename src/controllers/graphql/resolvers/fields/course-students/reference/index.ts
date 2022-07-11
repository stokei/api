import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CourseStudentsLoader } from '@/controllers/graphql/dataloaders/course-students.loader';
import { CourseStudent } from '@/controllers/graphql/types/course-student';

@Resolver(() => CourseStudent)
export class CourseStudentReferenceResolver {
  constructor(private readonly courseStudentsLoader: CourseStudentsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.courseStudentsLoader.findByIds.load(reference.id);
  }
}
