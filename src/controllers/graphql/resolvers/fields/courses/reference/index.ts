import { Resolver, ResolveReference } from '@nestjs/graphql';
import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { Course } from '@/controllers/graphql/types/course';

@Resolver(() => Course)
export class CourseReferenceResolver {
  constructor(private readonly coursesLoader: CoursesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.coursesLoader.findByIds.load(reference.id);
  }
}
