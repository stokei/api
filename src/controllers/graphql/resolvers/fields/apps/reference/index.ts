import { Resolver, ResolveReference } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';

@Resolver(() => App)
export class AppReferenceResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.appsLoader.findByIds.load(reference.id);
  }
}
