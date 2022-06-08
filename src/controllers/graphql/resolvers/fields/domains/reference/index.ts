import { Resolver, ResolveReference } from '@nestjs/graphql';
import { DomainsLoader } from '@/controllers/graphql/dataloaders/domains.loader';
import { Domain } from '@/controllers/graphql/types/domain';

@Resolver(() => Domain)
export class DomainReferenceResolver {
  constructor(private readonly domainsLoader: DomainsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.domainsLoader.findByIds.load(reference.id);
  }
}
