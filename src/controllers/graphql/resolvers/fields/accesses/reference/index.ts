import { Resolver, ResolveReference } from '@nestjs/graphql';

import { AccessesLoader } from '@/controllers/graphql/dataloaders/accesses.loader';
import { Access } from '@/controllers/graphql/types/access';

@Resolver(() => Access)
export class AccessReferenceResolver {
  constructor(private readonly accessesLoader: AccessesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.accessesLoader.findByIds.load(reference.id);
  }
}
