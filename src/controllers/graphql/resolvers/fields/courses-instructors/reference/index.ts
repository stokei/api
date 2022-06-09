import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CoursesInstructorsLoader } from '@/controllers/graphql/dataloaders/courses-instructors.loader';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';

@Resolver(() => CoursesInstructor)
export class CoursesInstructorReferenceResolver {
  constructor(
    private readonly coursesInstructorsLoader: CoursesInstructorsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.coursesInstructorsLoader.findByIds.load(reference.id);
  }
}
