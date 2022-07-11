import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CourseInstructorsLoader } from '@/controllers/graphql/dataloaders/course-instructors.loader';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';

@Resolver(() => CourseInstructor)
export class CourseInstructorReferenceResolver {
  constructor(
    private readonly courseInstructorsLoader: CourseInstructorsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.courseInstructorsLoader.findByIds.load(reference.id);
  }
}
