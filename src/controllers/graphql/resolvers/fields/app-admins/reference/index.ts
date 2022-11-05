import { Resolver, ResolveReference } from '@nestjs/graphql';

import { AppAdminsLoader } from '@/controllers/graphql/dataloaders/app-admins.loader';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';

@Resolver(() => AppAdmin)
export class AppAdminReferenceResolver {
  constructor(private readonly appAdminsLoader: AppAdminsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.appAdminsLoader.findByIds.load(reference.id);
  }
}
