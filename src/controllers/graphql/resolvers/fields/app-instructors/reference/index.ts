import { Resolver, ResolveReference } from '@nestjs/graphql';

import { AppInstructorsLoader } from '@/controllers/graphql/dataloaders/app-instructors.loader';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';

@Resolver(() => AppInstructor)
export class AppInstructorReferenceResolver {
  constructor(private readonly appInstructorsLoader: AppInstructorsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.appInstructorsLoader.findByIds.load(reference.id);
  }
}
