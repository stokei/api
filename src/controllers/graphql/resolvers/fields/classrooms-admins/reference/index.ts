import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ClassroomsAdminsLoader } from '@/controllers/graphql/dataloaders/classrooms-admins.loader';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';

@Resolver(() => ClassroomsAdmin)
export class ClassroomsAdminReferenceResolver {
  constructor(
    private readonly classroomsAdminsLoader: ClassroomsAdminsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.classroomsAdminsLoader.findByIds.load(reference.id);
  }
}
