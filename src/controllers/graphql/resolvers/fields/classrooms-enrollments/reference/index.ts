import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomsEnrollmentsLoader } from '@/controllers/graphql/dataloaders/classrooms-enrollments.loader';
import { ClassroomsEnrollment } from '@/controllers/graphql/types/classrooms-enrollment';

@Resolver(() => ClassroomsEnrollment)
export class ClassroomsEnrollmentReferenceResolver {
  constructor(
    private readonly classroomsEnrollmentsLoader: ClassroomsEnrollmentsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsEnrollmentsLoader.findByIds.load(reference.id);
  }
}
