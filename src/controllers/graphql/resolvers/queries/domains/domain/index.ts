import { Args, Query, Resolver } from '@nestjs/graphql';

import { DomainsLoader } from '@/controllers/graphql/dataloaders/domains.loader';
import { Domain } from '@/controllers/graphql/types/domain';
import { DomainNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Domain)
export class DomainResolver {
  constructor(private readonly domainsLoader: DomainsLoader) {}

  @Query(() => Domain)
  async domain(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const domain = await this.domainsLoader.findByIds.load(id);
    if (!domain) {
      throw new DomainNotFoundException();
    }
    return domain;
  }
}
