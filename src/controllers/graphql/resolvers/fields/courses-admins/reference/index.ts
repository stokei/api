import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CoursesAdminsLoader } from '@/controllers/graphql/dataloaders/courses-admins.loader';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';

@Resolver(() => CoursesAdmin)
export class CoursesAdminReferenceResolver {
  constructor(private readonly coursesAdminsLoader: CoursesAdminsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.coursesAdminsLoader.findByIds.load(reference.id);
  }
}
