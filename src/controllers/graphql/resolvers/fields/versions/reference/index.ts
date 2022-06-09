import { Resolver, ResolveReference } from '@nestjs/graphql';

import { VersionsLoader } from '@/controllers/graphql/dataloaders/versions.loader';
import { Version } from '@/controllers/graphql/types/version';

@Resolver(() => Version)
export class VersionReferenceResolver {
  constructor(private readonly versionsLoader: VersionsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.versionsLoader.findByIds.load(reference.id);
  }
}
